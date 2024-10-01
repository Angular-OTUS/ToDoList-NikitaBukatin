import { TestBed } from '@angular/core/testing';

import { ToDoListTasksService } from './to-do-list-tasks.service';

describe('ToDoListTasksService', () => {
  let service: ToDoListTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoListTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
