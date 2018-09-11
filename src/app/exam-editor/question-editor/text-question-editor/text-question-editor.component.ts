import { Component, OnInit, Input } from '@angular/core';

import { Question } from 'src/app/models/question';
import { QuestionEditorService } from '../../question-editor/question-editor.service';

@Component({
  selector: 'app-text-question-editor',
  templateUrl: './text-question-editor.component.html',
  styleUrls: ['./text-question-editor.component.css']
})
export class TextQuestionEditorComponent implements OnInit {
  @Input('question') currentQuestion: Question;
  constructor(
    private qs: QuestionEditorService
  ) { }

  ngOnInit() {
  }

  setImage = this.qs.setImage

  L = console.log;
}
