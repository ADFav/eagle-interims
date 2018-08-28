import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {
  obs: Subject<number[]>

  constructor() {
    this.obs = new Subject<number[]>();
    // this.obs.next([1,2,3]);
   }

   newValue(){
     this.obs.next([4,5,6]);
   }
}

