import { Component, OnInit } from '@angular/core';

import { ExamEditorService } from './exam-editor.service';
import { LoggerService } from '../logger.service';
import { Question, QuestionReference } from 'src/app/models/question';

@Component({
  selector: 'app-exam-editor',
  templateUrl: './exam-editor.component.html',
  styleUrls: ['./exam-editor.component.css']
})
export class ExamEditorComponent implements OnInit {
  questions: QuestionReference[];
  hidePreview: boolean;
  newQuestion: QuestionReference;
  currentExam: string;

  constructor(
    private editor: ExamEditorService,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.hidePreview = false;
    this.editor.questions.subscribe(questions => {
      this.logger.log("Questions coming into component: ", questions);
      this.questions = questions
    });
  }

  loadQuestions($event) {
    if ($event) {
      this.logger.log("Loading in questions");
      this.editor.getQuestions($event);
      this.currentExam = $event;
      this.editor.examPath = $event;
    }
  }

  submit(question: QuestionReference) {
    this.editor.submitQuestion(question)
    this.resetPreview(question);
  }

  resetPreview(question: QuestionReference) {
    question.edit = false;
    this.newQuestion = null;
    this.hidePreview = false;
  }

  addQuestion() {
    this.newQuestion = { edit: true, data:{} as Question} as QuestionReference;
    this.hidePreview = true;
  }

  edit(question: QuestionReference) {
    question.edit = true;
    this.hidePreview = true;
  }

  del(question: QuestionReference) {
    if (confirm("Delete this question?")) {
      this.editor.delete(question);
    }
  }

  L(thing?): void {
    console.log(thing || this.questions);
  }
}