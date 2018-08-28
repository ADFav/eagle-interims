import { Injectable } from '@angular/core';
import { ExamReference, Exam } from './objects/exam';
import { Observable, of } from 'rxjs';
import { LoggerService } from './logger.service';
import { QuestionReference, Question } from './objects/question';
import { visitAll } from '../../node_modules/@angular/compiler';
import { validateConfig } from '../../node_modules/@angular/router/src/config';

@Injectable({
  providedIn: 'root'
})
export class StubInterimsAFSService {
  exams: Observable<ExamReference[]>
  questions: Observable<QuestionReference[]>

  constructor(private logger: LoggerService) {
    this.generateExams();
  }

  generateExams() {
    let references: ExamReference[] = [];
    Array(2017, 2018, 2019).forEach((year: number) => {
      Array("A", "B", "C", "D").forEach(subject => {
        Array(1, 2, 3).forEach(number => {
          references.push({ path: `exams/${year}.${subject}.${number}`, data: new Exam(year, subject, number) } as ExamReference)
        })
      })
    })
    this.exams = of(references)
    this.logger.log(references);
  }

  generateQuestions(examPath: string) {
    if (examPath) {
      let questions: QuestionReference[] = [];
      Array(24).fill(0).map((val, index) => index).forEach(questionNumber => {
        let question = new Question();
        question.isMC = true;
        question.questionText = `This is question #${questionNumber} of exam ${examPath}`;
        Array("A", "B", "C", "D").forEach(answerChoice =>
          question[`answer${answerChoice}`] = `This is answer choice ${answerChoice} for question #${questionNumber}`
        )
        question.correctAnswer = Array("A", "B", "C", "D")[Math.floor(4 * Math.random())]
        questions.push({path: `${examPath}/questions/${questionNumber}`, data: question} as QuestionReference)
      })
      this.questions = of(questions);
    } else{
      this.questions = of();
    }
  }

  getQuestions = this.generateQuestions;
}
