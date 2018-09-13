import { Injectable } from '@angular/core';
import { Question } from 'src/app/models/question';
import { StubInterimsAFSService } from '../stub-interims-afs.service';
import { Observable, Subject } from 'rxjs';
import { LoggerService } from '../logger.service';
import { InterimsAFSService } from '../interims-afs.service';
import { FirestoreReference } from 'src/app/models/firestore-reference';

@Injectable({
  providedIn: 'root'
})
export class ExamEditorService {
  examPath: string;
  questions: Subject<FirestoreReference<Question>[]>;

  constructor(
    private afs: InterimsAFSService,
    private logger: LoggerService
  ) {
    this.questions = new Subject<FirestoreReference<Question>[]>();
    this.afs.questions.subscribe(questions => {
      this.logger.log("Questions coming in: ", questions);
      this.questions.next(questions)
    });
  }

  getQuestions(examPath: string) {
    this.afs.getQuestions(examPath);
  }

  submitQuestion(question: FirestoreReference<Question>) {
    if (question.path) {
      this.afs.submitQuestion(question);
    } else {
      this.afs.newQuestion(this.examPath, question.data);
    }
  }

  delete(question: FirestoreReference<Question>){
    this.afs.deleteQuestion(question);
  }
}
