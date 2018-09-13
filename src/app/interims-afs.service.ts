import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn, } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Exam } from './models/exam';
import { Question } from './models/question';
import { Student } from './models/student';
import { QuestionResponse } from './models/question-response';
import { FirestoreReference } from 'src/app/models/firestore-reference';

@Injectable({
  providedIn: 'root'
})
export class InterimsAFSService {
  exams: Observable<FirestoreReference<Exam>[]>;
  questions: Subject<FirestoreReference<Question>[]>;
  students: Subject<FirestoreReference<Student>[]>;
  responses: Subject<QuestionResponse[]>;

  constructor(
    private afs: AngularFirestore,
    private logger: LoggerService
  ) {
    this.exams = this.createReferences(this.afs.collection<Exam>("exams"))
    this.questions = new Subject<FirestoreReference<Question>[]>();
    this.students = new Subject<FirestoreReference<Student>[]>();
    this.responses = new Subject<QuestionResponse[]>();
  }

  createReferences<TYPE>(collection: AngularFirestoreCollection<TYPE>) {
    let result = collection.snapshotChanges().pipe(map(actions => {
      let references = actions.map(action => ({ path: action.payload.doc.ref.path, data: action.payload.doc.data() as TYPE }))
      this.logger.log("Created references: ", references);
      return references;
    }));

    return result;
  }

  deleteQuestion(question: FirestoreReference<Question>) {
    this.afs.doc(question.path).delete();
  }

  newQuestion(examPath: string, question: Question) {
    this.afs.doc(examPath).collection("questions").add(question)
  }

  submitQuestion(question: FirestoreReference<Question>) {
    this.afs.doc(question.path).set(question.data);
  }

  getQuestions(examPath: string) {
    this.createReferences<Question>(this.afs.doc(examPath).collection<Question>("questions")).subscribe(this.questions)
  }

  getTestTakers(examPath: string) {
    let query: QueryFn = ref => ref.where(`exams.${examPath}`, "==", true);
    this.createReferences<Student>(this.afs.collection<Student>("students", query)).subscribe(this.students)
  }

  getResponses(examPath: string) {
    this.afs.doc(examPath).collection<QuestionResponse>("responses").snapshotChanges().pipe(map(actions =>
      actions.map(action => action.payload.doc.data()))).subscribe(this.responses);
  }
}
