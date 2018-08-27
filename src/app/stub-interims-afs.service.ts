import { Injectable } from '@angular/core';
import { ExamReference, Exam } from './objects/exam';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StubInterimsAFSService {
  exams: Observable<ExamReference[]>
  constructor() {
    const references: ExamReference[] = [];
    Array(2017, 2018, 2019).forEach(year => {
      Array("A", "B", "C", "D").forEach(subject => {
        Array(1, 2, 3).forEach(number => {
          references.push({ path: `exams/${year}.${subject}.${number}`, data: new Exam(year, subject, number) } as ExamReference)
        })
      })
    })
    this.exams = of(references)
  }


}
