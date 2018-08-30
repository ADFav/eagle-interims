import { Injectable } from '@angular/core';
import { QuestionResponse } from '../objects/question-response';
import { Subject, generate } from 'rxjs';
import { Student } from '../objects/student';
import { QuestionReference, Question } from '../objects/question';
import { StubInterimsAFSService } from '../stub-interims-afs.service';
import { LoggerService } from '../logger.service';
import { InterimsAFSService } from '../interims-afs.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  quartilesObservable: Subject<any[]>;
  itemAnalysisObservable: Subject<any>;
  passRate : Subject<string>;
  averageCorrect: Subject<string>;
  range: Subject<string[]>;

  students: Map<string, Student>;
  questions: Map<string, Question>;
  responses: QuestionResponse[];

  examPath: string;
  PASSING_GRADE: number = 10;
  constructor(
    private afs: StubInterimsAFSService,
    private logger: LoggerService
  ) {
    this.quartilesObservable = new Subject<any[]>();
    this.itemAnalysisObservable = new Subject<any>();
    this.passRate = new Subject<string>();
    this.averageCorrect= new Subject<string>();
    this.range = new Subject<string[]>();
  
    this.afs.students.subscribe(students => {
      this.logger.log("New students coming in to analysis.service", students);
      this.students = students.reduce(this.arrToMap, new Map<string, Student>());
      // this.generateStatistics();
    });
    this.afs.questions.subscribe(questions => {
      this.logger.log("New questions coming in to analysis.service", questions)
      this.questions = questions.reduce(this.arrToMap, new Map<string, Question>())
      // this.generateStatistics();
    });
    this.afs.responses.subscribe(responses => {
      this.logger.log("New responses coming in to analysis.service", responses);
      this.responses = responses
      // this.generateStatistics();
    });
  }

  arrToMap = (aggregator: Map<string, any>, elem) => aggregator.set(elem.path, elem.data)

  getPercentile(data, percentile) {
    const index = (percentile / 100) * data.length;
    if (Math.floor(index) == index) {
      return (data[(index - 1)] + data[index]) / 2;
    }
    return data[Math.floor(index)];
  }

  splitIntoQuartiles(studentData: Map<string, number>, roster: Map<string, Student>) {
    this.logger.log("analysis.service: here are the student grades", studentData)
    let result = [[], [], [], []];
    let grades = Array.from(studentData.values()).sort((a,b) => a-b);
    let q1 = this.getPercentile(grades, 25);
    let q2 = this.getPercentile(grades, 50);
    let q3 = this.getPercentile(grades, 75);

    studentData.forEach((grade, studentID) => {
      let studentGradeData = {
        name: roster.get(studentID).NAME,
        numberCorrect: grade,
        percentageCorrect: (Math.round(100 * grade / this.questions.size)).toFixed(0)
      }
      if (grade >= q3) {
        result[3].push(studentGradeData)
      } else if (grade >= q2) {
        result[2].push(studentGradeData)
      } else if (grade >= q1) {
        result[1].push(studentGradeData)
      } else {
        result[0].push(studentGradeData)
      }
    })
    result.map(quartile => quartile.sort((a, b) => b.numberCorrect - a.numberCorrect))
    
    this.passRate.next((100*grades.filter(grade => grade > this.PASSING_GRADE).length / grades.length).toFixed(2));
    this.averageCorrect.next((grades.reduce( (a, b) => a + b, 0) / grades.length).toFixed(2));
    this.range.next([grades[0].toFixed(0), grades[grades.length-1].toFixed(0)]);
    return result;
  }

  gradeStudents(questions: Map<string, Question>) {
    return function (aggregator: Map<string, number>, response: QuestionResponse): Map<string, number> {
      if (!aggregator.has(response.studentPath)) {
        aggregator.set(response.studentPath, 0)
      }
      if (questions.has(response.questionPath) && questions.get(response.questionPath)) {
        let oldScore = aggregator.get(response.studentPath);
        let question = questions.get(response.questionPath);
        let answerRight = response.answerChoice === question.correctAnswer
        aggregator.set(response.studentPath, oldScore + (answerRight ? 1 : 0))
      }
      return aggregator;
    }
  }

  generateStatistics(examPath?: string) {
    this.logger.log("Service: beginning statistics calculation");
    if (examPath) {
      this.examPath = examPath;
      this.afs.getTestTakers(examPath);
      this.afs.getQuestions(examPath);
      this.afs.getResponses(examPath);
    }
    this.createQuartiles(this.responses, this.questions, this.students);
    this.createItemAnalysis(this.responses, this.questions)
  }

  createQuartiles(responses: QuestionResponse[], questions: Map<string, Question>, roster: Map<string, Student>) {
    let studentGrades = responses.reduce(this.gradeStudents(questions), new Map<string, number>())
    let quartiles = this.splitIntoQuartiles(studentGrades, roster);
    this.quartilesObservable.next(quartiles);
  }

  createItemAnalysis(responses: QuestionResponse[], questions: Map<string, Question>) {
    let itemAnalysis = responses.reduce(this.groupResponses(questions), new Map<string, Map<string, number>>());
    this.itemAnalysisObservable.next(itemAnalysis);
  }

  groupResponses(questions: Map<string, Question>) {
    return function (aggregator: Map<string, Map<string, any>>, response: QuestionResponse): Map<string, Map<string, number>> {
      if (!aggregator.has(response.questionPath)) {
        aggregator.set(response.questionPath, new Map<string, number>())
        Array("A", "B", "C", "D").forEach(answerChoice =>
          aggregator.get(response.questionPath).set(answerChoice, 0)
        )
        aggregator.get(response.questionPath).set("Correct",questions.get(response.questionPath).correctAnswer)
      }
      let oldNumber = aggregator.get(response.questionPath).get(response.answerChoice);
      aggregator.get(response.questionPath).set(response.answerChoice, oldNumber + 1)
      return aggregator;
    }
  }
}
