import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exam } from 'src/app/models/exam';
import { FirestoreReference } from 'src/app/models/firestore-reference';

@Component({
  selector: 'app-student-select-exam',
  templateUrl: './student-select-exam.component.html',
  styleUrls: ['./student-select-exam.component.css']
})
export class StudentSelectExamComponent implements OnInit {

  @Input() exams: FirestoreReference<Exam>[];
  @Output() selectedExamPath = new EventEmitter<string>()
  constructor() { }

  ngOnInit() { 
    console.log(this.exams);
  }

  examPreview(exam: FirestoreReference<Exam>) {
    return `${exam.data.subject} | ${exam.data.year} | ${exam.data.interimNumber}`;
  }

  selectExam(exam: FirestoreReference<Exam>) {
    this.selectedExamPath.emit(exam.path)
  }

}
