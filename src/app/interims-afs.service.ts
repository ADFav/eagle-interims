import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggerService } from 'src/app/logger.service';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
import { Student } from 'src/app/models/student';
import { QuestionResponse } from 'src/app/models/question-response';
import { FirestoreReference } from 'src/app/models/firestore-reference';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class InterimsAFSService {
  exams: Observable<FirestoreReference<Exam>[]>;
  questions: Subject<FirestoreReference<Question>[]>;
  students: Subject<FirestoreReference<Student>[]>;
  student: Subject<Student>;
  responses: Subject<QuestionResponse[]>;

  constructor(
    private afs: AngularFirestore,
    private logger: LoggerService
  ) {
    this.exams = this.createReferences(this.afs.collection<Exam>("exams"))
    this.questions = new Subject<FirestoreReference<Question>[]>();
    this.students = new Subject<FirestoreReference<Student>[]>();
    this.responses = new Subject<QuestionResponse[]>();
    this.student = new Subject<Student>();
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
    const examID = examPath.split("/")[1];
    let query: QueryFn = ref => ref.where(`EXAMS.${examID}`, "==", true);
    this.createReferences<Student>(this.afs.collection<Student>("students", query)).subscribe(this.students)
  }

  getResponses(examPath: string) {
    this.afs.doc(examPath).collection<QuestionResponse>("responses").snapshotChanges().pipe(map(actions =>
      actions.map(action => action.payload.doc.data()))).subscribe(this.responses);
  }

  getStudent(studentID: string) {
    this.afs.doc<Student>(`students/${studentID}`).ref.get().then(snapshot =>
      this.student.next(snapshot.data() as Student)
    )
  }

  getExam(examPath: string) {
    return this.afs.doc(examPath).ref.get().then(snapshot => ({ path: snapshot.ref.path, data: snapshot.data() as Exam }))
  }

  writeResponses(responses: Map<string, QuestionResponse>) {
    const batch = this.afs.firestore.batch();
    responses.forEach((response, questionPath) =>
      batch.set(this.afs.collection(`${response.examPath}/responses`).doc(this.afs.createId()).ref, Object.assign({}, response))
    )
    return batch.commit();
  }

  addUser(user: firebase.User): Promise<FirestoreReference<User>> {
    const uid = user.uid;
    const newUser: User = {
      uid,
      userName: user.displayName,
      isValidated: false,
      adminLevel: 0
    };
    return this.afs.collection("users").doc(uid).set(newUser)
      .then( () => {
        console.log("added new user");
        return {path: `users/${uid}`, data: newUser};
      })
  }

  fetchUser(user: firebase.User): Promise<FirestoreReference<User>> {
    return this.fetchUserByUID(user.uid);
  }
  fetchUserByUID(uid: string): Promise<FirestoreReference<User>>{
    return this.afs.collection("users").doc<User>(uid).ref.get()
      .then(snapshot => ({path: snapshot.ref.path, data: snapshot.data() as User}))
  }
}
