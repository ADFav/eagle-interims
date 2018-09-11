import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { QuestionReference } from 'src/app/models/question';



@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.css']
})
export class QuestionPreviewComponent implements OnInit {

  @Input() question: QuestionReference; 
  constructor() { }

  ngOnInit() {
  }  
}
