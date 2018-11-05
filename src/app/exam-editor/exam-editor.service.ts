import { Injectable } from '@angular/core';
import { Question } from 'src/app/models/question';
import { StubInterimsAFSService } from '../stub-interims-afs.service';
import { Observable, Subject } from 'rxjs';
import { LoggerService } from '../logger.service';
import { InterimsAFSService } from '../interims-afs.service';
import { FirestoreReference } from 'src/app/models/firestore-reference';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ExamEditorService {
  examPath: string;
  questions: Subject<FirestoreReference<Question>[]>;
  students: Subject<FirestoreReference<Student>[]>;

  constructor(
    private afs: InterimsAFSService,
    private logger: LoggerService
  ) {
    this.questions = new Subject<FirestoreReference<Question>[]>();
    this.afs.questions.subscribe(questions => {
      this.logger.log("Questions coming in: ", questions);
      this.questions.next(questions)
    });
    this.students = new Subject<FirestoreReference<Student>[]>();
    this.afs.students.subscribe(students => {
      this.logger.log("Students coming in: ", students);
      this.students.next(students)
    });
  }

  getQuestions(examPath: string) {
    this.afs.getQuestions(examPath);
    this.afs.getStudents(examPath);
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
