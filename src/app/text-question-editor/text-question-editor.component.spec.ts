import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextQuestionEditorComponent } from './text-question-editor.component';

describe('TextQuestionEditorComponent', () => {
  let component: TextQuestionEditorComponent;
  let fixture: ComponentFixture<TextQuestionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextQuestionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextQuestionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
