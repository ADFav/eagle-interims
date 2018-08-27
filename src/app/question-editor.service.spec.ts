import { TestBed, inject } from '@angular/core/testing';

import { QuestionEditorService } from './question-editor.service';

describe('QuestionEditor.Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionEditorService]
    });
  });

  it('should be created', inject([QuestionEditorService], (service: QuestionEditorService) => {
    expect(service).toBeTruthy();
  }));
});
