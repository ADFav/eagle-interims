import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Exam, ExamReference } from '../objects/exam';

import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ExamSelectorService } from './exam-selector.service';

@Component({
  selector: 'app-exam-selector',
  templateUrl: './exam-selector.component.html',
  styleUrls: ['./exam-selector.component.css']
})
export class ExamSelectorComponent implements OnInit {
  @Output() examKey = new EventEmitter<string>();

  public selectedYear: number;
  public selectedSubject: string;
  public selectedNumber: number;

  public examsList: Observable<ExamReference[]>;
  examCollectionRef: AngularFirestoreCollection<Exam>;
  yearsList: number[];
  numbersList: number[];
  subjectsList: string[];

  constructor(
    private selector: ExamSelectorService,
    public afs: AngularFirestore
  ) {
    this.examCollectionRef = this.afs.collection<Exam>('exams');
    this.examsList = this.examCollectionRef.snapshotChanges().pipe(map(actions =>
      actions.map(action => ({ id: action.payload.doc.id, data: action.payload.doc.data() }))
    ))
  }

  ngOnInit(){
    this.selector.examYears.subscribe( years => this.yearsList = years)
    this.selector.examSubjects.subscribe( subjects => this.subjectsList = subjects)
    this.selector.examNumbers.subscribe( numbers => this.numbersList = numbers)
  }


  selectProperty(key: string, property: string, filters: any[]) {
    console.log(this.selectedYear, this.selectedSubject, this.selectedNumber);
    console.log(filters);
    let mapFunction = function (actions) {
      console.log("Map function beginning");
      let result = actions;
      if (filters) {
        filters.forEach(f => result = result.filter((examRef: ExamReference) => examRef.data[f.property] == f.value))
      }
      console.log("HELLO!", result);
      result = result
        .map(examRef => examRef.data[property])
        .filter((e, i, arr) => arr.indexOf(e) == i)
        .sort();
      return result;
    }
    console.log("Running map function");
    this[key] = this.examsList.pipe(map(mapFunction));
  }

  getExamYears(): void {
    this.selectedYear = null;
    this.selectedSubject = null;
    this.selectedNumber = null;
    this.selectProperty('yearsList', 'year', [])
  }

  getExamSubjects(): void {
    this.selectedSubject = null;
    this.selectedNumber = null;
    this.selectProperty('subjectsList', 'subject', [{ property: 'year', value: this.selectedYear }]);
  }

  getExamNumbers(): void {
    this.selectProperty('numbersList', 'interimNumber', [{ property: 'year', value: this.selectedYear }, { property: 'subject', value: this.selectedSubject }]);
  }

  // getExamSubjects(exams: ExamReference[]): Set<string> {
  //   return this.selectProperty(exams, 'subject', [{ property: 'year', value: this.selectedYear }])
  // }

  // getExamNumbers(exams: ExamReference[]): Set<number> {
  //   return this.selectProperty(exams, 'interimNumber', [{ property: 'year', value: this.selectedYear }, { property: 'subject', value: this.selectedSubject }])
  // }

  setKey(): string {
    return Object.keys(this.examsList).filter(key =>
      this.examsList[key].year == this.selectedYear &&
      this.examsList[key].subject == this.selectedSubject &&
      this.examsList[key].interimNumber == this.selectedNumber)[0];
  }
}