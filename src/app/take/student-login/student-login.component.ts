import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TakeService } from '../take.service';
import { Student } from 'src/app/models/student';
import { MatDialogRef } from '@angular/material';

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
  constructor(
    private dialogRef: MatDialogRef<StudentLoginComponent>,
    private take: TakeService){}

  ngOnInit() {
    this.take.student.subscribe(student => {
      this.handleIncomingStudent(student)
    });
  }

  submit() {
    console.log("submit button hit");
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
      this.dialogRef.close();
    }
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
