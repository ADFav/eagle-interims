import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FirestoreReference } from 'src/app/models/firestore-reference';
import { Question } from 'src/app/models/question';
import { QuestionResponse } from 'src/app/models/question-response';
import { TakeService } from '../take.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit, OnChanges {

  currentQuestion: FirestoreReference<Question>;
  @Input() questions: FirestoreReference<Question>[];
  @Input() student: Student;
  questionIndex: number;
  responses: Map<string, QuestionResponse>;
  constructor(private take: TakeService) { }

  ngOnInit() {
    this.currentQuestion = {} as FirestoreReference<Question>;
    this.responses = new Map<string, QuestionResponse>();
    this.questionIndex = 0;
  }

  ngOnChanges() {
    if (this.questions) {
      this.currentQuestion = this.questions[this.questionIndex];
    }
  }

  setResponse(response: QuestionResponse) {
    if (response.answerChoice != "" || !this.responses.has(response.questionPath)) {
      this.responses.set(response.questionPath, response);
      this.next();
    }
  }

  next() {
    this.questionIndex++;
    this.questionIndex %= this.questions.length;
    this.currentQuestion = this.questions[this.questionIndex];
  }

  setQuestion(questionRef: FirestoreReference<Question>) {
    console.log(questionRef);
    this.questionIndex = this.questions.map(question => question.path).indexOf(questionRef.path);
    this.currentQuestion = this.questions[this.questionIndex];
  }

  writeResponses() {
    if (this.responses.size == this.questions.length) {
      this.take.writeResponses(this.responses).then(() => console.log("Responses written!"))
    } else {
      alert("You haven't answered every question yet!");
    }
  }

}
