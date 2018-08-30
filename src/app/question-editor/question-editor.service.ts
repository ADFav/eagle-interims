import { Injectable } from '@angular/core';
import { Question } from '../objects/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionEditorService {
  constructor(  ) { }
  
  setImage(question: Question, event, key) {
    getBase64(event.target.files[0], question, key);

    function getBase64(file, obj, key) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => { obj[key] = reader.result || ''; };
      reader.onerror = () => obj[key] = '';
    }
  }
}
