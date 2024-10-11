import {inject, Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

export interface Task {
  id: string;
  text: string;
  description?: string;
  status: TaskStatus;
}

export type TaskStatus = 'InProgress' | 'Completed';

@Injectable({
  providedIn: 'root'
})
export class ToDoListTasksService implements OnDestroy {
  private apiUrl: string = 'http://localhost:3000/tasks';
  private destroy$: Subject<void> = new Subject<void>();
  http: HttpClient = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  setTask(taskText: string, taskDescription?: string): Observable<Task> {
    const newTask: Omit<Task, 'id'> = {
      text: taskText.trim(),
      description: taskDescription,
      status: 'InProgress'
    };

    return this.http.post<Task>(this.apiUrl, newTask);
  }

  deleteTaskById(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }

  updateTitleById(id: string, text: string): Observable<Partial<Task>> {
    return this.http.patch<Partial<Task>>(`${this.apiUrl}/${id}`, { text })
  }

  changeStatusById(id: string): void {
    this.http.get<Task>(`${this.apiUrl}/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(task => {
      const newStatus: TaskStatus = task.status === 'InProgress' ? 'Completed' : 'InProgress';
      const updatedTask: Task = { ...task, status: newStatus };

      this.http.patch<Task>(`${this.apiUrl}/${id}`, updatedTask)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
