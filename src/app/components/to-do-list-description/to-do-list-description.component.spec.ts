import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListDescriptionComponent } from './to-do-list-description.component';

describe('ToDoListDescriptionComponent', () => {
  let component: ToDoListDescriptionComponent;
  let fixture: ComponentFixture<ToDoListDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoListDescriptionComponent]
    });
    fixture = TestBed.createComponent(ToDoListDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
