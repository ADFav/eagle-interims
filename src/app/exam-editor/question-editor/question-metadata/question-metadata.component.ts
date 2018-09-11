import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question';



@Component({
  selector: 'app-question-metadata',
  templateUrl: './question-metadata.component.html',
  styleUrls: ['./question-metadata.component.css']
})
export class QuestionMetadataComponent implements OnInit {

  public regentsYears: number[] = [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
  public regentsMonths: string[] = ["", "Jun", "Aug", "Jan"];
  public bloomOptions: string[] = ["", "Recall", "Comprehension", "Application", "Analysis", "Synthesis", "Evaluation"];

  public regentsMonth: string;
  public regentsYear: string;
  
  @Input('question') currentQuestion: Question;
  
  constructor() { }

  ngOnInit() { }

}
