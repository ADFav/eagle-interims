import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Question } from 'src/app/models/question';
import { Student } from 'src/app/models/student';
import { TakeService } from '../take.service';
import { QuestionResponse } from '../../models/question-response';
import { FirestoreReference } from 'src/app/models/firestore-reference';


@Component({
  selector: 'app-take-question',
  templateUrl: './take-question.component.html',
  styleUrls: ['./take-question.component.css']
})
export class TakeQuestionComponent implements OnChanges, OnInit {

  @Input() questionRef: FirestoreReference<Question>;
  @Output() response = new EventEmitter<QuestionResponse>();
  question: Question;
  SAResponse: string;
  questionPath: string;
  student: Student;
  constructor(private take: TakeService) { }

  ngOnInit() {
    this.student = this.take.student;
    console.log(this.question);
  }

  ngOnChanges() {
    this.question = this.questionRef.data;
    this.questionPath = this.questionRef.path;
    this.SAResponse = "";
  }

  setResponse(response: string) {
    const result = {} as QuestionResponse;
    result.questionPath = this.questionPath;
    result.answerChoice = response;
    result.studentPath = `students/10`;
    this.response.emit(result);
  }
  L() {
    console.log(this.question);
  }
}
