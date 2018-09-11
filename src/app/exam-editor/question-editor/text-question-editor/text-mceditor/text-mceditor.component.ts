import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionEditorService } from '../../question-editor.service';


@Component({
  selector: 'app-text-mceditor',
  templateUrl: './text-mceditor.component.html',
  styleUrls: ['./text-mceditor.component.css']
})
export class TextMCEditorComponent implements OnInit {

  @Input('question') currentQuestion: Question;
  constructor(private qs: QuestionEditorService) { }

  ngOnInit() {  }

  setImage = this.qs.setImage;

}
