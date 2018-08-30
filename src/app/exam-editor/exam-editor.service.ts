import { Injectable } from '@angular/core';
import { QuestionReference } from '../objects/question';
import { StubInterimsAFSService } from '../stub-interims-afs.service';
import { Observable, Subject } from 'rxjs';
import { LoggerService } from '../logger.service';
import { InterimsAFSService } from '../interims-afs.service';

@Injectable({
  providedIn: 'root'
})
export class ExamEditorService {
  examPath: string;
  questions: Subject<QuestionReference[]>;

  constructor(
    private afs: InterimsAFSService,
    private logger: LoggerService
  ) {
    this.questions = new Subject<QuestionReference[]>();
    this.afs.questions.subscribe(questions => {
      this.logger.log("Questions coming in: ", questions);
      this.questions.next(questions)
    });
  }

  getQuestions(examPath: string) {
    this.afs.getQuestions(examPath);
  }

  submitQuestion(question: QuestionReference) {
    if (question.path) {
      this.afs.submitQuestion(question);
    } else {
      this.afs.newQuestion(this.examPath, question.data);
    }
  }

  delete(question: QuestionReference){
    this.afs.deleteQuestion(question);
  }
}
