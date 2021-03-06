import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ExamSelectorService } from './exam-selector.service';
import { LoggerService, StubLoggerService } from '../logger.service';
import { Observer, Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewExamComponent } from './new-exam-component';
import { Exam } from '../models/exam';
import { InterimsAFSService } from '../interims-afs.service';


@Component({
  selector: 'app-exam-selector',
  templateUrl: './exam-selector.component.html',
  styleUrls: ['./exam-selector.component.css']
})
export class ExamSelectorComponent implements OnInit {
  @Output() examPath = new EventEmitter<string>();

  selectedYear: number;
  selectedSubject: string;
  selectedNumber: number;

  yearsList: number[];
  numbersList: number[];
  subjectsList: string[];

  constructor(
    private selector: ExamSelectorService,
    private logger: LoggerService,
    public dialog: MatDialog
  ) {  }

  ngOnInit() {
    this.logger.log("Initializing Exam Selector Component");
    this.selector.examYears.asObservable().subscribe(years => this.yearsList = years);
    this.selector.examSubjects.asObservable().subscribe(subjects => {
      this.logger.log("Recieving: ",JSON.stringify(subjects))
      this.subjectsList = subjects
    });
    this.selector.examNumbers.asObservable().subscribe(interimNumbers => this.numbersList = interimNumbers);
    this.selector.selectedExamPath.asObservable().subscribe(examPath =>{ 
      this.logger.log(examPath);
      this.examPath.emit(examPath);
    });
    this.selector.createYearsList();
  }

  getExamSubjects() {
    this.selectedSubject = null;
    this.selectedNumber = null;
    this.selector.createSubjectsList(this.selectedYear)
  }
  getExamNumbers() {
    this.selectedNumber = null;
    this.selector.createNumbersList(this.selectedYear, this.selectedSubject);
  }
  setKey() {
    this.selector.getExamPath(this.selectedYear, this.selectedSubject, this.selectedNumber);
  }

  addNewExam() {
    let newExamDialog = this.dialog.open(NewExamComponent);

    newExamDialog.afterClosed().subscribe(result => console.log(result));
  }
}
