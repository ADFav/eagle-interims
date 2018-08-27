import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference, Reference } from 'angularfire2/firestore';
import { QuestionResponse } from '../objects/question-response';
import { Student } from '../objects/student';
import { Question, QuestionReference } from '../objects/question';
import { map } from "rxjs/operators"

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  currentResponse: QuestionResponse;
  roster: Student[];
  examName: string;
  questions: QuestionReference[] = [];
  studentCap: number = 200;
  constructor(private afs: AngularFirestore) {
    this.examName = "test-exam";
  }

  ngOnInit() {
    // this.afs.collection<Student>('students', ref => ref.limit(this.studentCap)).valueChanges().subscribe(results => this.roster = results)
    // this.afs.collection<Question>(`exams/${this.examName}/questions`).snapshotChanges().pipe(map(actions =>
    //   actions.map(action => ({ edit: false, id: action.payload.doc.id, data: action.payload.doc.data() } as QuestionReference))
    // )).subscribe(results => this.questions = results)
  }

  submit(response: QuestionResponse = this.currentResponse) {
    return this.afs.collection<QuestionResponse>(`exams/${response.examID}/responses`)
      .doc(`${response.studentID}.${response.questionID}`).ref;
  }

  generateQuestions(numQuestions = 24) {
    console.log(numQuestions)
    console.log(this.questions.length)
    for (let i = 0; i < numQuestions - this.questions.length; i++) {
      console.log("WHAT THE HELL?!")
      let newQ = new Question(this.examName);
      newQ.correctAnswer = Array('a', 'b', 'c', 'd')[Math.floor(Math.random() * 4)];
      newQ.standards = [String(Math.floor(Math.random() * 6))]
      this.afs.collection<Question>(`exams/${this.examName}/questions`).add(Object.assign({}, newQ));
    }
  }

  generateMockResponses(numStudents = 20, exam = "test-exam") {
    this.roster.forEach(student => {
      let batch = this.afs.firestore.batch();
      this.questions.forEach(question => {
        let response: QuestionResponse = {
          examID: this.examName,
          questionID: question.id,
          studentID: student.STUDENT_ID,
          answerChoice: Array('a', 'b', 'c', 'd')[Math.floor(Math.random() * 4)]
        }
        batch.set(this.submit(response),response);
      });
      batch.commit();
    })
  }
}
