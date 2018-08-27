import { Injectable } from '@angular/core';
import { InterimsAFSService } from '../interims-afs.service';
import { Observable, of, from } from 'rxjs';
import { StubInterimsAFSService } from '../stub-interims-afs.service';
import { ExamReference } from '../objects/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamSelectorService {
  exams: ExamReference[]
  examYears: Observable<number[]>;
  examSubjects: Observable<string[]>;
  examNumbers: Observable<number[]>;

  constructor(private afs: StubInterimsAFSService) {
    this.afs.exams.subscribe(exams => {
      this.exams = exams;
      this.examYears = of(
        this.exams
          .map(examReference => examReference.data.year)
          .filter((year, index, years) => years.indexOf(year) == index)
      )
    })
  }
}
