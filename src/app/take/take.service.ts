import { Injectable } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Exam } from 'src/app/models/exam';
import { Question, QuestionReference } from 'src/app/models/question';
import { StubInterimsAFSService } from '../stub-interims-afs.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TakeService {
  public student: Student;
  private exam: Exam;
  private questions: QuestionReference[];

  public currentQuestion: Subject<QuestionReference>;
  constructor(
    private afs: StubInterimsAFSService,
  ) {
    this.currentQuestion = new Subject<QuestionReference>();
    this.afs.questions.subscribe(questions => {
      this.questions = questions;
    }); 
    
  }

  studentLogIn(studentID: string) {
    this.student = this.afs.getStudent(studentID);
  }

  getQuestions(examPath) {
    this.afs.getQuestions(examPath);
  }
}
