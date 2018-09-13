import { Component, OnInit } from '@angular/core';
import { TakeService } from './take.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Question } from 'src/app/models/question';
import { QuestionResponse } from 'src/app/models/question-response';
import { FirestoreReference } from 'src/app/models/firestore-reference';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.css']
})
export class TakeComponent implements OnInit {

  currentQuestion: FirestoreReference<Question>;
  questions: FirestoreReference<Question>[];
  questionIndex: number;
  responses: Map<string, QuestionResponse>;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.currentQuestion = {} as FirestoreReference<Question>;
    this.responses = new Map<string, QuestionResponse>();
    console.log(this.currentQuestion);
    this.questionIndex = 0;
    this.afs.collection("/exams/2SXvHc2EtCCKgRj6qwHA/questions").ref.get().then(snapshots => {
      this.questions = snapshots.docs.map(snapshot => ({ path: snapshot.ref.path, data: snapshot.data() as Question }));
      this.currentQuestion = this.questions[0];
      console.log(this.currentQuestion);
    })
  }

  setResponse(response: QuestionResponse) {
    this.responses.set(response.questionPath, response);
    this.next();
  }

  next() {
    this.questionIndex++;
    this.questionIndex %= this.questions.length;
    this.currentQuestion = this.questions[this.questionIndex];
  }

  setQuestion(questionRef: FirestoreReference<Question>){
    console.log(questionRef);
    this.questionIndex = this.questions.map(question => question.path).indexOf(questionRef.path);
    this.currentQuestion = this.questions[this.questionIndex];
  }

}
