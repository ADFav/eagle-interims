import { TestBed, inject } from '@angular/core/testing';

import { ExamEditorService } from './exam-editor.service';

describe('ExamEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamEditorService]
    });
  });

  it('should be created', inject([ExamEditorService], (service: ExamEditorService) => {
    expect(service).toBeTruthy();
  }));
});
