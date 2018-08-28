import { Component, OnInit } from '@angular/core';
import { SandboxService } from './sandbox.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  constructor(private sandbox: SandboxService) {
    
   }


  clickHandler(){
    this.sandbox.newValue();
  }
  ngOnInit() {
    this.sandbox.obs.asObservable().subscribe(console.log);
  }

}
