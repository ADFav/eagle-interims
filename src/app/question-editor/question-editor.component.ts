import { Component, OnInit, Input } from '@angular/core';

import { QuestionEditorService } from '../question-editor.service';
import { Question } from "../objects/question";

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent implements OnInit {
  @Input('question') currentQuestion: Question;

  constructor(
    private qs: QuestionEditorService
  ) { }

  ngOnInit() {
  }
  L = console.log;
}
