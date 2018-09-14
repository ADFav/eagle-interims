import { Injectable } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
import { StubInterimsAFSService } from '../stub-interims-afs.service';
import { Subject } from 'rxjs';
import { FirestoreReference } from 'src/app/models/firestore-reference';
import { InterimsAFSService } from '../interims-afs.service';
import { QuestionResponse } from 'src/app/models/question-response';

@Injectable({
  providedIn: 'root'
})
export class TakeService {
  student: Subject<Student>;
  questions: Subject<FirestoreReference<Question>[]>;
  examsList: Subject<FirestoreReference<Exam>[]>;
  examPath: string;
  constructor(
    private afs: InterimsAFSService
  ) {
    this.questions = new Subject<FirestoreReference<Question>[]>();
    this.afs.questions.subscribe(questions => this.questions.next(questions));

    this.student = new Subject<Student>();
    this.afs.student.subscribe(student => this.student.next(student))
    this.examsList = new Subject<FirestoreReference<Exam>[]>();
  }

  studentLogin(studentID: string) {
    this.afs.getStudent(studentID);
  }

  getStudentsExams(student: Student) {
    const examPaths = Object.keys(student.EXAMS);
    if (examPaths.length === 1) {
      this.selectExam(examPaths[0]);
    } else {
      const getAllExams: Promise<FirestoreReference<Exam>>[] = examPaths.map(path => this.afs.getExam(path));
      Promise.all(getAllExams).then(exams =>{ 
        this.examsList.next(exams)
      })
    }
  }

  selectExam(examPath: string) {
    this.examPath = examPath;
    this.afs.getQuestions(examPath);
  }

  writeResponses(responses: Map<string, QuestionResponse>) {
    return this.afs.writeResponses(responses);
  }
}
