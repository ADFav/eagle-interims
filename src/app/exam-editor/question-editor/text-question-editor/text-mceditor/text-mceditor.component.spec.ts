import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMCEditorComponent } from './text-mceditor.component';

describe('TextMCEditorComponent', () => {
  let component: TextMCEditorComponent;
  let fixture: ComponentFixture<TextMCEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextMCEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMCEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
