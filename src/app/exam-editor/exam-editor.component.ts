import { Component, OnInit } from '@angular/core';
import { ExamEditorService } from './exam-editor.service';
import { LoggerService } from '../logger.service';
import { Question } from 'src/app/models/question';
import { FirestoreReference } from 'src/app/models/firestore-reference';

@Component({
  selector: 'app-exam-editor',
  templateUrl: './exam-editor.component.html',
  styleUrls: ['./exam-editor.component.css']
})
export class ExamEditorComponent implements OnInit {
  questions: FirestoreReference<Question>[];
  hidePreview: boolean;
  newQuestion: FirestoreReference<Question>;
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

  submit(question: FirestoreReference<Question>) {
    this.editor.submitQuestion(question)
    this.resetPreview(question);
  }

  resetPreview(question: FirestoreReference<Question>) {
    question.edit = false;
    this.newQuestion = null;
    this.hidePreview = false;
  }

  addQuestion() {
    this.newQuestion = { edit: true, data:{} as Question} as FirestoreReference<Question>;
    this.hidePreview = true;
  }

  edit(question: FirestoreReference<Question>) {
    question.edit = true;
    this.hidePreview = true;
  }

  del(question: FirestoreReference<Question>) {
    if (confirm("Delete this question?")) {
      this.editor.delete(question);
    }
  }

  L(thing?): void {
    console.log(thing || this.questions);
  }
}