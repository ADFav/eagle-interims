import { Component, Input } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-text-saeditor',
  templateUrl: './text-saeditor.component.html',
  styleUrls: ['./text-saeditor.component.css']
})
export class TextSAEditorComponent {
  @Input('question') currentQuestion: Question;

  public newResponse: string;
  public edits: boolean[] = []

  constructor() { }

  remove(index: number): void {
    this.currentQuestion.modelResponses.splice(index, 1);
  }

  addResponse(): void {
    if (!this.currentQuestion.modelResponses) {
      this.currentQuestion.modelResponses = [];
    }
    if (this.newResponse && this.newResponse != "") {
      this.currentQuestion.modelResponses.push(this.newResponse);
      this.edits.push(false);
      this.newResponse = "";
    }
  }

  trackerFn(index: any, item: any) {
    return index;
  }
}