import { Component, OnInit, Input } from '@angular/core';
import { AnalysisService } from './analysis.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {
  quartiles: any[][];
  itemAnalysis: any;

  constructor(
    private analysis: AnalysisService,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.analysis.quartilesObservable.subscribe(quartiles => {
      this.logger.log("analyze.component: new quartiles information coming in", quartiles)
      this.quartiles = quartiles
    });

    this.analysis.itemAnalysisObservable.subscribe(itemAnalysis => {
      this.logger.log("analyze.component: new item analysis information coming in", itemAnalysis)
      this.itemAnalysis = itemAnalysis;
    });
  }

  loadStats(examPath: string) {
    if (examPath) {
      this.logger.log("Generating Statistics");
      this.analysis.generateStatistics(examPath);
    }
  }

}
