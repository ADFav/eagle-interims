import { Component, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Student } from 'src/app/models/student';
import { Exam } from 'src/app/models/exam';
import { FirestoreReference } from '../models/firestore-reference';


@Component({
  selector: 'app-student-uploader',
  templateUrl: './student-uploader.component.html',
  styleUrls: ['./student-uploader.component.css']
})
export class StudentUploaderComponent {

  @Input() examPath: string;
  constructor(private afs: AngularFirestore) { }

  uploadCSV(evt) {
    const reader = new FileReader();
    reader.readAsText(evt.target.files[0]);
    reader.onload = (event: any) => {
      this.extractData(event.target.result)
    }
  }

  extractData(data) {
    let csvData = data;
    let allLines = csvData.split(/\r\n|\n/).map(line => line.split(","));
    const headers = allLines.splice(0, 1)[0].map((header: string) => header.replace(/\s/g, '_').replace('#', 'NUM'));

    let studentData: Student[] = allLines
      .map(line => line.reduce(this.convertLineToObject(headers), {}))

    console.log(studentData);
    const examID = this.examPath.split("/")[1];
    const students = this.afs.collection<Student>('students');
    studentData.forEach((student: Student) => {
      const studentID = String(student['STUDENT_ID'])
      students.doc(studentID).ref.get().then(snapshot => {
        if (snapshot.exists) {
          const partialStudentUpdate = {};
          partialStudentUpdate[`EXAMS.${examID}`] = true;
          snapshot.ref.update(partialStudentUpdate)
        } else {
          student.EXAMS = {}
          student.EXAMS[examID] = true;
          snapshot.ref.set(student);
        }
      })
    });
  }

  convertLineToObject(headers: string[]) {
    return function (obj: Object, elem: any, index: number) {
      obj[headers[index]] = elem;
      return obj;
    }
  }
}