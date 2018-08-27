import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSAEditorComponent } from './text-saeditor.component';

describe('TextSAEditorComponent', () => {
  let component: TextSAEditorComponent;
  let fixture: ComponentFixture<TextSAEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSAEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSAEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
