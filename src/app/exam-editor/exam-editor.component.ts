import { Component, OnInit, Inject } from '@angular/core';
import { ExamEditorService } from './exam-editor.service';
import { LoggerService } from '../logger.service';
import { Question } from 'src/app/models/question';
import { FirestoreReference } from 'src/app/models/firestore-reference';
import { Student } from '../models/student';

@Component({
  selector: 'app-exam-editor',
  templateUrl: './exam-editor.component.html',
  styleUrls: ['./exam-editor.component.css']
})
export class ExamEditorComponent implements OnInit {
  questions: FirestoreReference<Question>[];
  students: FirestoreReference<Student>[];
  hidePreview: boolean;
  newQuestion: FirestoreReference<Question>;
  currentExam: string;
  KEYS: string[] = ["Type", "Question Text", "Standards", "Unit"]

  constructor(
    private editor: ExamEditorService,
    private logger: LoggerService,
  ) { }

  ngOnInit() {
    this.hidePreview = false;
    this.editor.questions.subscribe(questions => {
      this.logger.log("Questions coming into component: ", questions);
      this.questions = questions;
    });
    this.editor.students.subscribe(students => {
      this.logger.log("Students coming into component: ", students);
      this.students = students;
    });
  }

  loadQuestions(examPath: string) {
    if (examPath) {
      this.logger.log("Loading in questions");
      this.editor.getQuestions(examPath);
      this.currentExam = examPath;
      this.editor.examPath = examPath;
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
    this.logger.log("add question");
    this.newQuestion = { edit: true, data: { isMC: true, isIMG: false } as Question }
    this.hidePreview = true;
  }

  edit(question: FirestoreReference<Question>) {
    question.edit = true;
    this.hidePreview = true;
  }

  del(question: FirestoreReference<Question>) {
    if (confirm("Delete this question?")) {
      this.editor.delete(question);
      this.hidePreview = false;
    }
  }

  cancel() {
    this.hidePreview = false;
  }

  L(thing?): void {
    console.log(thing || this.questions);
  }
}