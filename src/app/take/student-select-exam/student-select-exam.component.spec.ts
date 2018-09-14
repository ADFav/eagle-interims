import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSelectExamComponent } from './student-select-exam.component';

describe('StudentSelectExamComponent', () => {
  let component: StudentSelectExamComponent;
  let fixture: ComponentFixture<StudentSelectExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSelectExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSelectExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
