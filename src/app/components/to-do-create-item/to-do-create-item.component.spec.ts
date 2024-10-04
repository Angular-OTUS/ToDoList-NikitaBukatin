import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCreateItemComponent } from './to-do-create-item.component';

describe('ToDoCreateItemComponent', () => {
  let component: ToDoCreateItemComponent;
  let fixture: ComponentFixture<ToDoCreateItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoCreateItemComponent]
    });
    fixture = TestBed.createComponent(ToDoCreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
