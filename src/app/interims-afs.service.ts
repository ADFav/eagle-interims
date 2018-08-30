import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentData,
  AngularFirestoreCollection,
  QueryFn,
  Query,
  CollectionReference
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exam, ExamReference } from './objects/exam';
import { Question, QuestionReference } from './objects/question';
import { Student, StudentReference } from './objects/student';
import { QuestionResponse } from './objects/question-response';
import { LoggerService } from './logger.service';


@Injectable({
  providedIn: 'root'
})
export class InterimsAFSService {
  exams: Observable<ExamReference[]>;
  questions: Observable<QuestionReference[]>;
  students: Observable<StudentReference[]>;
  responses: Observable<QuestionResponse[]>;

  constructor(
    private afs: AngularFirestore,
    private logger: LoggerService
  ) {
    this.exams = this.createReferences(this.afs.collection<Exam>("exams"))
    this.questions = new Observable<QuestionReference[]>();
    this.students = new Observable<StudentReference[]>();
    this.responses = new Observable<QuestionResponse[]>();
  }

  createReferences<TYPE>(collection: AngularFirestoreCollection<TYPE>) {
    let result = collection.snapshotChanges().pipe(map(actions =>
      actions.map(action => ({ path: action.payload.doc.ref.path, data: action.payload.doc.data() as TYPE }))
    ));
    this.logger.log("Created references: ",result);
    return result;
  }

  deleteQuestion(question: QuestionReference) {
    this.afs.doc(question.path).delete();
  }

  newQuestion(examPath: string, question: Question) {
    this.afs.doc(examPath).collection("questions").add(question)
  }

  submitQuestion(question: QuestionReference) {
    this.afs.doc(question.path).set(question.data);
  }

  getQuestions(examPath: string) {
    this.questions = this.createReferences(this.afs.doc(examPath).collection<Question>("questions"))
  }

  getTestTakers(examPath: string) {
    this.students = this.createReferences(this.afs.collection<Student>("students", ref => ref.where(`exams.${examPath}`, "==", true)))
  }

  getResponses(examPath: string) {
    this.responses = this.afs.doc(examPath).collection<QuestionResponse>("responses").snapshotChanges().pipe(map(actions =>
      actions.map(action => action.payload.doc.data())))
  }
}
