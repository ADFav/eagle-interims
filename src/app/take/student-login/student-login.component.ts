import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TakeService } from '../take.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  student: Student;
  studentID: string;
  alert: string;

  @Output() loggedIn = new EventEmitter<boolean>();
  constructor(private take: TakeService) { }

  ngOnInit() {
    this.take.student.subscribe(student => {
      this.handleIncomingStudent(student)
    });
  }

  submit() {
    if (this.studentID === "") {
      this.alert = "Enter your student ID";
    } else {
      this.take.studentLogin(this.studentID);
    }
  }

  handleIncomingStudent(student: Student) {
    this.student = student;
    if (this.student === null) {
      this.alert = "Could not find student ID, try again";
      this.loggedIn.emit(false);
    } else {
      this.loggedIn.emit(true);
    }
  }


}
