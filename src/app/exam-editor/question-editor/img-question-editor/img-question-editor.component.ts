import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionEditorService } from 'src/app/exam-editor/question-editor/question-editor.service';

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
