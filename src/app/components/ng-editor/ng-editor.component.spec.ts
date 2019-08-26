import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgEditorComponent } from './ng-editor.component';

describe('NgEditorComponent', () => {
  let component: NgEditorComponent;
  let fixture: ComponentFixture<NgEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
