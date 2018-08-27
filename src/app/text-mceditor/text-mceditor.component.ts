import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../objects/question';

@Component({
  selector: 'app-text-mceditor',
  templateUrl: './text-mceditor.component.html',
  styleUrls: ['./text-mceditor.component.css']
})
export class TextMCEditorComponent implements OnInit {

  @Input('question') currentQuestion: Question;
  constructor() { }

  ngOnInit() {
  }

}
