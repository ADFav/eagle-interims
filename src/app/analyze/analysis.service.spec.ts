import { TestBed, inject } from '@angular/core/testing';

import { AnalysisService } from './analysis.service';

describe('AnalysisServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalysisService]
    });
  });

  it('should be created', inject([AnalysisService], (service: AnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
