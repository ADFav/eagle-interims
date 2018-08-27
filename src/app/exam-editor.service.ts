import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Question } from './objects/question';
import { Exam } from './objects/exam';



@Injectable({
  providedIn: 'root'
})
export class ExamEditorService {
  public db: AngularFirestore;
  constructor(
  ){}
  
  getQuestions(examKey: string) {
  }

  getExams(): Exam[]{
    let result = this.db.collection('/exams').valueChanges()
    console.log(result);
    return null;
  }

  postQuestion(question: Question){
  }

  postExam(exam: Exam){
  }
}
