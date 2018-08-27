import { Injectable } from '@angular/core';
import { QuestionResponse } from '../objects/question-response';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor() {
    
   }

  getPercentile(data, percentile) {
    const index = (percentile / 100) * data.length;
    if (Math.floor(index) == index) {
      return (data[(index - 1)] + data[index]) / 2;
    }
    return data[Math.floor(index)];
  }

  splitIntoQuartiles(studentData) {
    let result = [[], [], [], []];
    let grades = studentData.map(datum => datum.data).sort()
    let q1 = this.getPercentile(grades, 25);
    let q2 = this.getPercentile(grades, 50);
    let q3 = this.getPercentile(grades, 75);

    studentData.forEach(datum => {
      if (datum.data >= q3) {
        result[3].push(datum)
      } else if (datum.data >= q2) {
        result[2].push(datum)
      } else if (datum.data >= q1) {
        result[1].push(datum)
      } else {
        result[0].push(datum)
      }
    })

    return result;
  }

  gradeStudents(questions) {
    return function (obj, response: QuestionResponse) {
      if (!obj[response.studentID]) {
        obj[response.studentID] = 0;
      }
      obj[response.studentID] += questions[response.questionID].correctAnswer == response.answerChoice ? 1 : 0;
      return obj;
    }
  }
}
