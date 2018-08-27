import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Question } from './objects/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionEditorService {
  constructor(
    private http: HttpClient
  ) { }

  postQuestion(question: Question){
    this.http.post("", question)
  }

}
