import { TestBed, inject } from '@angular/core/testing';

import { StubInterimsAFSService } from './stub-interims-afs.service';

describe('StubInterimsAFSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StubInterimsAFSService]
    });
  });

  it('should be created', inject([StubInterimsAFSService], (service: StubInterimsAFSService) => {
    expect(service).toBeTruthy();
  }));
});
