import { Component, OnInit, OnChanges } from '@angular/core';
import { TakeService } from './take.service';
import { Exam } from 'src/app/models/exam';
import { FirestoreReference } from 'src/app/models/firestore-reference';
import { Student } from 'src/app/models/student';
import { Question } from 'src/app/models/question';
import { MatDialog } from '@angular/material';
import { StudentLoginComponent } from './student-login/student-login.component';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.css']
})
export class TakeComponent implements OnInit, OnChanges {
  questions: FirestoreReference<Question>[]
  examsList: FirestoreReference<Exam>[]
  student: Student;

  isLoggedIn: boolean;
  hasSelectedExam: boolean;

  ngOnInit() {
    this.isLoggedIn = false;
    this.hasSelectedExam = true;

    this.take.questions.subscribe(questions => this.questions = questions);
    this.take.student.subscribe(student => {
      this.student = student
      if(student){
        this.take.getStudentsExams(student);
      }
    });
    this.take.examsList.subscribe(examsList => {
      console.log(examsList);
      this.examsList = examsList;
      this.hasSelectedExam = examsList.length === 1;
    });
    this.take.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.dialog.open(StudentLoginComponent);

  }

  ngOnChanges() { }

  constructor(private take: TakeService, public dialog: MatDialog) { }

  selectExam(examPath) {
    this.take.selectExam(examPath);
    this.hasSelectedExam = true;
  }
}
