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

  log = (...args: any[]) => null;
}
