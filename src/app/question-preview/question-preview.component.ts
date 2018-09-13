import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Question } from 'src/app/models/question';
import { FirestoreReference } from 'src/app/models/firestore-reference';



@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.css']
})
export class QuestionPreviewComponent implements OnInit {

  @Input() question: FirestoreReference<Question>; 
  constructor() { }

  ngOnInit() {
  }  
}
