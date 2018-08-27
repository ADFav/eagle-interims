import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Student } from '../objects/student';
import { QuestionResponse } from '../objects/question-response';
import { Question } from '../objects/question';
import { AnalysisService } from './analysis.service';
import { InterimsAFSService } from '../interims-afs.service';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {
  public questions: any;
  public roster: any;
  public studentGrades: any;
  public quartiles: any[][];
  // @Input() examID: string;
  public numQuestions: number;
  private examID = "test-exam";

  constructor(
    private afs: InterimsAFSService,
    private analysis: AnalysisService
  ) { }

  ngOnInit() {
    // this.afs.setExamPath(`exams/${this.examID}`)

    // this.afs.getSnapshotAsHashMap<Student>("students", 10).subscribe(result => 
    //   this.roster = result
    // )
    // this.afs.getSnapshotAsHashMap<Question>(`${this.afs.examPath}/questions`).subscribe(result => {
    //   this.questions = result;
    //   this.numQuestions = Object.keys(this.questions).length;
    // })
    // this.afs.collection<QuestionResponse>(`${examPath}/responses`).valueChanges().pipe(map(responses =>
    //   responses.reduce(this.analysis.gradeStudents(this.questions), {})
    // )).subscribe(results => this.quartiles = this.analysis.splitIntoQuartiles(this.convertHashMapToArray(results).sort((studentA, studentB) => studentB.data - studentA.data))
    // );
  }

  K = Object.keys;
  Round = Math.round;

  L() {
    console.log(this.roster);
    console.log(this.questions);
    console.log(this.studentGrades)
  }
}
