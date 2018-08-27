import { TestBed, inject } from '@angular/core/testing';

import { InterimsAFSService } from './interims-afs.service';

describe('InterimsAFSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterimsAFSService]
    });
  });

  it('should be created', inject([InterimsAFSService], (service: InterimsAFSService) => {
    expect(service).toBeTruthy();
  }));
});
