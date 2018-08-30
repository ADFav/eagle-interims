import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../objects/question';
import { QuestionEditorService } from '../question-editor/question-editor.service';

@Component({
  selector: 'app-img-question-editor',
  templateUrl: './img-question-editor.component.html',
  styleUrls: ['./img-question-editor.component.css']
})
export class ImgQuestionEditorComponent implements OnInit {
  @Input('question') currentQuestion: Question;
  constructor(
    private qs: QuestionEditorService
  ) { }

  ngOnInit() {  }

  setImage = this.qs.setImage

  L = console.log;
}
