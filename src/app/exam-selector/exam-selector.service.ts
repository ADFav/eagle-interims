import { Injectable, Testability } from '@angular/core';
import { InterimsAFSService } from '../interims-afs.service';
import { Observable, of, Subject } from 'rxjs';
import { StubInterimsAFSService } from '../stub-interims-afs.service';
import { ExamReference } from '../objects/exam';
import { LoggerService, StubLoggerService } from '../logger.service';

@Injectable({
  providedIn: 'root'
})
export class ExamSelectorService {

  exams: ExamReference[]
  examYears: Subject<number[]>;
  examSubjects: Subject<string[]>;
  examNumbers: Subject<number[]>;
  selectedExamPath: Subject<string>;

  constructor(
    private afs: StubInterimsAFSService,
    private logger: StubLoggerService
  ) {
    this.logger.log("Initializing Exam Selector Service");
    this.afs.exams.subscribe(exams => this.exams = exams);
    this.examYears = new Subject<number[]>();
    this.examSubjects = new Subject<string[]>();
    this.examNumbers = new Subject<number[]>();
    this.selectedExamPath = new Subject<string>();
    this.createYearsList()
  }

  createYearsList() {
    this.examYears.next(this.exams
      .map(examRef => examRef.data.year)
      .filter(this.onlyUnique)
    )
    this.examSubjects.next([]);
    this.examNumbers.next([]);
    this.selectedExamPath.next();
  }

  createSubjectsList(year: number) {
    this.logger.log("Sending subjects with year", year);
    this.logger.log("year has type: ", typeof (year))
    const subjectsWithYear = this.exams
      .filter(examRef => examRef.data.year == year)
      .map(examRef => examRef.data.subject)
      .filter(this.onlyUnique);
    this.logger.log("These subjects: ", JSON.stringify(subjectsWithYear));
    this.examSubjects.next(subjectsWithYear)
    this.examNumbers.next([]);
    this.selectedExamPath.next();
  }

  createNumbersList(year: number, subject: string) {
    this.examNumbers.next(this.exams
      .filter(examRef => examRef.data.year == year)
      .filter(examRef => examRef.data.subject === subject)
      .map(examRef => examRef.data.interimNumber)
      .filter(this.onlyUnique)
    )
    this.selectedExamPath.next();
  }

  getExamPath(year: number, subject: string, interimNumber: number) {
    this.selectedExamPath.next(this.exams
      .filter(examRef => examRef.data.year == year)
      .filter(examRef => examRef.data.subject === subject)
      .filter(examRef => examRef.data.interimNumber == interimNumber)
      .map(examRef => examRef.path)[0]
    )
  }

  onlyUnique = (elem: any, index: number, arr: any[]): boolean => arr.indexOf(elem) === index;

}

