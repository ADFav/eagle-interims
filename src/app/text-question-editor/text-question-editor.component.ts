import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../objects/question';

@Component({
  selector: 'app-text-question-editor',
  templateUrl: './text-question-editor.component.html',
  styleUrls: ['./text-question-editor.component.css']
})
export class TextQuestionEditorComponent implements OnInit {
  @Input('question') currentQuestion: Question;
  constructor() { }

  ngOnInit() {
  }

  L = console.log;
}
