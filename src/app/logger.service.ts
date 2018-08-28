import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log = console.log;
}

@Injectable({
  providedIn: 'root'
})
export class StubLoggerService {

  constructor() { }

  log = (msg1?: any, msg2?: any, msg3?: any, msg4?: any) => null;
}
