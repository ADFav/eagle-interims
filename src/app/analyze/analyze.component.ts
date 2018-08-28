import { Component, OnInit, Input } from '@angular/core';
import { AnalysisService } from './analysis.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {
  questions: any;
  roster: any;
  studentGrades: any;
  quartiles: any[][];
  // @Input() examID: string;
  numQuestions: number;
  private examID = "test-exam";

  constructor(
    private analysis: AnalysisService,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.analysis.quartiles.subscribe(quartiles => this.quartiles = quartiles);
    this.analysis.roster.subscribe(roster => this.roster = roster);
    this.analysis.questions.subscribe(questions => this.numQuestions = questions.length);
  }

  loadStats(examPath: string) {
    if (examPath) {
      this.logger.log("Generating Statistics");
      this.analysis.generateStatistics(examPath);
    }
  }

}
