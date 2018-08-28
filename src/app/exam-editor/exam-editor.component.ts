import { Component, OnInit } from '@angular/core';

import { Question, QuestionReference } from '../objects/question';
import { ExamEditorService } from './exam-editor.service';
import { LoggerService } from '../logger.service';

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
    this.editor.getQuestions($event);
    this.currentExam = $event;
    this.editor.examPath = $event;
  }

  submit(question: QuestionReference) {
    this.editor.submitQuestion(question)
    this.hidePreview = false;
  }

  resetPreview(question: QuestionReference) {
    question.edit = false;
    this.newQuestion = null;
    this.hidePreview = false;
  }

  addQuestion() {
    this.newQuestion = { edit: true, data: new Question(this.currentExam) } as QuestionReference;
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