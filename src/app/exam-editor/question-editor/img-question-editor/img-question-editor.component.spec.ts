import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgQuestionEditorComponent } from './img-question-editor.component';

describe('ImgQuestionEditorComponent', () => {
  let component: ImgQuestionEditorComponent;
  let fixture: ComponentFixture<ImgQuestionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgQuestionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgQuestionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
