import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUploaderComponent } from './student-uploader.component';

describe('StudentUploaderComponent', () => {
  let component: StudentUploaderComponent;
  let fixture: ComponentFixture<StudentUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
