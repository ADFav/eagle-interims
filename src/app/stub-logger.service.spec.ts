import { TestBed, inject } from '@angular/core/testing';

import { StubLoggerService } from './stub-logger.service';

describe('StubLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StubLoggerService]
    });
  });

  it('should be created', inject([StubLoggerService], (service: StubLoggerService) => {
    expect(service).toBeTruthy();
  }));
});
