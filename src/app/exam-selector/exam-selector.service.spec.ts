import { TestBed, inject } from '@angular/core/testing';

import { ExamSelectorService } from './exam-selector.service';

describe('ExamSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamSelectorService]
    });
  });

  it('should be created', inject([ExamSelectorService], (service: ExamSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
