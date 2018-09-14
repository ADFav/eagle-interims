import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggerService } from './logger.service';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
import { Student } from 'src/app/models/student';
import { QuestionResponse } from 'src/app/models/question-response';
import { FirestoreReference } from 'src/app/models/firestore-reference';


@Injectable({
  providedIn: 'root'
})
export class StubInterimsAFSService {
  exams: Subject<FirestoreReference<Exam>[]>
  questions: Subject<FirestoreReference<Question>[]>
  students: Subject<FirestoreReference<Student>[]>
  responses: Subject<QuestionResponse[]>
  student: Subject<Student>;

  private examData: Map<string, Exam>;
  private questionsData: Map<string, Question>;
  private studentData: Map<string, Student>;
  private responsesData: QuestionResponse[]

  private NUMQUESTIONS: number = 24;

  constructor(private logger: LoggerService) {
    this.examData = new Map<string, Exam>();
    this.questionsData = new Map<string, Question>();
    this.studentData = new Map<string, Student>();

    this.student = new Subject<Student>();
    this.exams = new Subject<FirestoreReference<Exam>[]>();
    this.questions = new Subject<FirestoreReference<Question>[]>();
    this.students = new Subject<FirestoreReference<Student>[]>();
    this.responses = new Subject<QuestionResponse[]>();
    this._generateExams();
  }

  private _generateExams() {
    let references: FirestoreReference<Exam>[] = [];
    Array(2017, 2018, 2019).forEach((year: number) => {
      Array("A", "B", "C", "D").forEach(subject => {
        Array(1, 2, 3).forEach(number => {
          references.push({ path: `exams/${year}.${subject}.${number}`, data: new Exam(year, subject, number) })
          this.examData.set(`exams/${year}.${subject}.${number}`, new Exam(year, subject, number))
        })
      })
    })
    this.exams.next(references)
  }

  private _generateQuestions(examPath: string) {
    this.logger.log("stub-afs generating questions");
    this.questionsData = new Map<string, Question>();
    if (examPath) {
      Array(this.NUMQUESTIONS).fill(0).forEach((q, questionNumber) => {
        let question = {} as Question;
        question.isMC = true;
        question.questionText = `This is question #${1 + questionNumber} of exam ${examPath}`;
        Array("A", "B", "C", "D").forEach(answerChoice =>
          question[`answer${answerChoice}`] = `This is answer choice ${answerChoice} for question #${1+questionNumber}`
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

  submitQuestion(question: FirestoreReference<Question>) {
    this.questionsData.set(question.path, question.data);
    this.logger.log("Question Updated:", this.questionsData.get(question.path))
    this._updateQuestionsObservable();
  }

  newQuestion(examPath: string, question: Question) {
    let randomLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(26 * Math.random()));
    this.questionsData.set(`${examPath}/questions/${randomLetter}`, question)
    this._updateQuestionsObservable();
  }

  private _updateQuestionsObservable() {
    let questionRefs = []
    this.questionsData.forEach((value, key) =>
      questionRefs.push({ path: key, data: value })
    )
    this.logger.log("These are the questions: ", questionRefs);
    this.questions.next(questionRefs)
  }

  deleteQuestion(question: FirestoreReference<Question>) {
    this.questionsData.delete(question.path);
    this._updateQuestionsObservable();
  }

  private _generateStudents() {
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

  private _updateStudentObservable() {
    let studentRefs = []
    this.studentData.forEach((student, path) =>
      studentRefs.push({ path: path, data: student })
    )
    this.students.next(studentRefs)
  }

  getResponses(examPath: string) {
    this._generateResponses(examPath, this.questionsData, this.studentData)
    this._updateResponsesObservable()
  }

  private _generateResponses(examPath: string, questions: Map<string, Question>, students: Map<string, Student>) {
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
  private _updateResponsesObservable() {
    this.responses.next(this.responsesData)
  }

  getTestTakers(examPath: string) {
    this._generateStudents();
  }

  getStudent(studentID: string) {
    if (Number(studentID) > 0) {
      const student = {} as Student;
      student.STUDENT_ID = studentID;
      student.NAME = "FAKE NAME";
      student.EXAMS = ['exams/2018.A.1', 'exams/2018.B.1']
      this.student.next(student);
    } else {
      this.student.next(null);
    }
  }

  getExam(examPath: string) {
    this.logger.log(examPath);
    const exam = this.examData.get(examPath);
    const _getExam = () => ({ path: examPath, data: exam })
    return new Promise<FirestoreReference<Exam>>( (res, rej) => res(_getExam()));
  }
}
