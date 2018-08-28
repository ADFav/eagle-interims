import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StubLoggerService {

  constructor() { }

  log = (msg: any) => null;
}
