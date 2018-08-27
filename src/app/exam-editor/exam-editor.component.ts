import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { Question, QuestionReference } from '../objects/question';

@Component({
  selector: 'app-exam-editor',
  templateUrl: './exam-editor.component.html',
  styleUrls: ['./exam-editor.component.css']
})
export class ExamEditorComponent {
  public currentExam: string = "2SXvHc2EtCCKgRj6qwHA";
  public questions: Observable<QuestionReference[]>;
  public hidePreview: boolean = false;
  private collectionRef: AngularFirestoreCollection<Question>;
  newQuestion: QuestionReference;

  constructor(private afs: AngularFirestore) { }

  getQuestions(examID: string) {
    this.collectionRef = this.afs.collection<Question>(["exams", examID, "questions"].join("/"));
    this.questions = this.collectionRef
      .snapshotChanges()
      .pipe(map(actions => actions.map(action => ({ id: action.payload.doc.id, edit: false, data: action.payload.doc.data() }))))
  }

  submit(question: QuestionReference) {
    if (question.id) {
      this.collectionRef
        .doc(question.id)
        .set(question.data)
        .then(() => this.resetPreview(question))
    } else {
      this.collectionRef
        .add(Object.assign({},question.data))
        .then(() => this.resetPreview(question))
    }
  }

  resetPreview(question: QuestionReference) {
    this.newQuestion = null;
    question.edit = false;
    this.hidePreview = false;
  }

  addQuestion() {
    this.newQuestion = { edit: true, data: new Question(this.currentExam) } as QuestionReference;
    this.hidePreview = true;
  }

  edit(question: QuestionReference) {
    question.edit = true;
    this.hidePreview = true;
  }

  del(question: QuestionReference) {
    if (confirm("Delete this question?")) {
      this.collectionRef.doc(question.id).delete();
    }
  }

  L(thing?): void {
    console.log(thing || this.questions);
  }
}