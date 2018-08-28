import { Injectable } from '@angular/core';
import { ExamReference, Exam } from './objects/exam';
import { Observable, of, Subject } from 'rxjs';
import { LoggerService } from './logger.service';
import { QuestionReference, Question } from './objects/question';
import { Student } from './objects/student';
import { QuestionResponse } from './objects/question-response';

@Injectable({
  providedIn: 'root'
})
export class StubInterimsAFSService {
  exams: Observable<ExamReference[]>
  questions: Subject<QuestionReference[]>
  students: Subject<Student[]>
  responses: Subject<QuestionResponse[]>

  examData: Map<string, Exam>;
  questionsData: Map<string, Question>;
  studentData: Map<number, Student>;
  responsesData: QuestionResponse[]

  constructor(private logger: LoggerService) {
    this.examData = new Map<string, Exam>();
    this.questionsData = new Map<string, Question>();
    this.studentData = new Map<number, Student>();

    this.questions = new Subject<QuestionReference[]>();
    this.students = new Subject<Student[]>();
    this.responses = new Subject<QuestionResponse[]>();
    this.generateExams();
  }

  generateExams() {
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

  generateQuestions(examPath: string) {
    this.questionsData = new Map<string, Question>();
    if (examPath) {
      Array(24).fill(0).forEach((q, questionNumber) => {
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
    this.generateQuestions(examPath);
    this.updateQuestionsObservable();
  }

  submitQuestion(question: QuestionReference) {
    this.questionsData.set(question.path, question.data);
    this.logger.log("Question Updated:", this.questionsData.get(question.path))
    this.updateQuestionsObservable();
  }

  newQuestion(examPath: string, question: Question) {
    let randomLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(26 * Math.random()));
    this.questionsData.set(`${examPath}/questions/${randomLetter}`, question)
    this.updateQuestionsObservable();
  }

  updateQuestionsObservable() {
    let questionRefs = []
    this.questionsData.forEach((value, key) =>
      questionRefs.push({ path: key, data: value } as QuestionReference)
    )
    this.logger.log("These are the questions: ", questionRefs);
    this.questions.next(questionRefs)
  }

  deleteQuestion(question: QuestionReference) {
    this.questionsData.delete(question.path);
    this.updateQuestionsObservable();
  }

  getTestTakers(examPath: string) {
    this.studentData = new Map<number, Student>();
    "ABCDEFGHIJKLMNOPQRS".split("").forEach((studentName, index) => {
      let student = {} as Student;
      student.NAME = studentName;
      student.STUDENT_ID = String(index);
      student.NYS_STUDENT_ID = index;
      this.studentData.set(index, student);
    })
    this.updateStudentObservable();
  }

  updateStudentObservable() {
    let studentRefs = []
    this.studentData.forEach((value, key) =>
      studentRefs.push(value)
    )
    this.logger.log("These are the students: ", studentRefs);
    this.students.next(studentRefs)
  }

  getResponses(examPath) {
    this.responsesData = [];
    this.questionsData.forEach((question, questionKey) => {
      this.studentData.forEach((student, studentID) => {
        let response = {} as QuestionResponse;
        response.examID = examPath;
        response.questionID = questionKey;
        response.studentID = String(studentID);
        response.answerChoice = Array("A", "B", "C", "D")[Math.floor(4 * Math.random())];
        this.responsesData.push(response);
      })
    })
    this.updateResponsesObservable()
  }

  updateResponsesObservable() {
    this.responses.next(this.responsesData)
  }
}
