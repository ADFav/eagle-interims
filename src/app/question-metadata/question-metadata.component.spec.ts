import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMetadataComponent } from './question-metadata.component';

describe('QuestionMetadataComponent', () => {
  let component: QuestionMetadataComponent;
  let fixture: ComponentFixture<QuestionMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
