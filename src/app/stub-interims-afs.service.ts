import { Injectable } from '@angular/core';
import { ExamReference, Exam } from './objects/exam';
import { Observable, of, Subject } from 'rxjs';
import { LoggerService } from './logger.service';
import { QuestionReference, Question } from './objects/question';
import { Student, StudentReference } from './objects/student';
import { QuestionResponse } from './objects/question-response';

@Injectable({
  providedIn: 'root'
})
export class StubInterimsAFSService {
  exams: Observable<ExamReference[]>
  questions: Subject<QuestionReference[]>
  students: Subject<StudentReference[]>
  responses: Subject<QuestionResponse[]>

  examData: Map<string, Exam>;
  questionsData: Map<string, Question>;
  studentData: Map<string, Student>;
  responsesData: QuestionResponse[]

  constructor(private logger: LoggerService) {
    this.examData = new Map<string, Exam>();
    this.questionsData = new Map<string, Question>();
    this.studentData = new Map<string, Student>();

    this.questions = new Subject<QuestionReference[]>();
    this.students = new Subject<StudentReference[]>();
    this.responses = new Subject<QuestionResponse[]>();
    this._generateExams();
  }

  _generateExams() {
    let references: ExamReference[] = [];
    Array(2017, 2018, 2019).forEach((year: number) => {
      Array("A", "B", "C", "D").forEach(subject => {
        Array(1, 2, 3).forEach(number => {
          references.push({ path: `exams/${year}.${subject}.${number}`, data: new Exam(year, subject, number) } as ExamReference)
          this.examData.set(`exams/${year}.${subject}.${number}`, new Exam(year, subject, number))
        })
      })
    })
    this.exams = of(references)
    this.logger.log(references);
  }

  _generateQuestions(examPath: string) {
    this.logger.log("stub-afs generating questions");
    this.questionsData = new Map<string, Question>();
    if (examPath) {
      Array(12).fill(0).forEach((q, questionNumber) => {
        let question = new Question();
        question.isMC = true;
        question.questionText = `This is question #${1 + questionNumber} of exam ${examPath}`;
        Array("A", "B", "C", "D").forEach(answerChoice =>
          question[`answer${answerChoice}`] = `This is answer choice ${answerChoice} for question #${questionNumber}`
        )
        question.correctAnswer = Array("A", "B", "C", "D")[Math.floor(4 * Math.random())]
        question.standards = Array(3).fill(0).map(standard =>
          `${Array("A", "B", "C")[Math.floor(3 * Math.random())]}.${Array(1, 2, 3, 4)[Math.floor(4 * Math.random())]}`
        ).filter((v, i, arr) => arr.indexOf(v) === i);
        this.questionsData.set(`${examPath}/questions/${questionNumber}`, question)
      })
    }
  }

  getQuestions(examPath: string) {
    this.logger.log("stub-afs getting questions");
    this._generateQuestions(examPath);
    this._updateQuestionsObservable();
  }

  submitQuestion(question: QuestionReference) {
    this.questionsData.set(question.path, question.data);
    this.logger.log("Question Updated:", this.questionsData.get(question.path))
    this._updateQuestionsObservable();
  }

  newQuestion(examPath: string, question: Question) {
    let randomLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(26 * Math.random()));
    this.questionsData.set(`${examPath}/questions/${randomLetter}`, question)
    this._updateQuestionsObservable();
  }

  _updateQuestionsObservable() {
    let questionRefs = []
    this.questionsData.forEach((value, key) =>
      questionRefs.push({ path: key, data: value } as QuestionReference)
    )
    this.logger.log("These are the questions: ", questionRefs);
    this.questions.next(questionRefs)
  }

  deleteQuestion(question: QuestionReference) {
    this.questionsData.delete(question.path);
    this._updateQuestionsObservable();
  }

  _generateStudents() {
    this.logger.log("stub-afs generating students");
    this.studentData = new Map<string, Student>();
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("").forEach((studentName, index) => {
      let student = {} as Student;
      student.NAME = studentName;
      student.STUDENT_ID = String(index);
      student.NYS_STUDENT_ID = index;
      this.studentData.set(`students/${index}`, student);
    })
    this.logger.log("Here are the students", this.studentData);
    this._updateStudentObservable();
  }

  _updateStudentObservable() {
    let studentRefs = []
    this.studentData.forEach((student, path) =>
      studentRefs.push({ path: path, data: student } as StudentReference)
    )
    this.students.next(studentRefs)
  }

  getResponses(examPath: string) {
    this._generateResponses(examPath, this.questionsData, this.studentData)
    this._updateResponsesObservable()
  }

  _generateResponses(examPath: string, questions: Map<string, Question>, students: Map<string, Student>) {
    this.logger.log("stub-afs generating responses");
    let result = [];
    questions.forEach((question, questionKey) => {
      students.forEach((student, studentID) => {
        let response = {} as QuestionResponse;
        response.examID = examPath;
        response.questionPath = questionKey;
        response.studentPath = String(studentID);
        response.answerChoice = Array("A", "B", "C", "D")[Math.floor(4 * Math.random())];
        result.push(response);
      })
    })
    this.responsesData = result;
  }
  _updateResponsesObservable() {
    this.responses.next(this.responsesData)
  }

  getTestTakers(examPath: string){
    this._generateStudents(); 
  }
}
