import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question';
import { FirestoreReference } from 'src/app/models/firestore-reference';

@Component({
  selector: 'app-question-selector',
  templateUrl: './question-selector.component.html',
  styleUrls: ['./question-selector.component.css']
})
export class QuestionSelectorComponent implements OnInit {

  @Input() questionRefs: FirestoreReference<Question>[];
  @Output() selection = new EventEmitter<FirestoreReference<Question>>();
  constructor() { }

  ngOnInit() {
  }

  select(questionRef: FirestoreReference<Question>){
    this.selection.emit(questionRef);
  }


}
