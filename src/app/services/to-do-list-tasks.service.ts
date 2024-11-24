import {inject, Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface Task {
  id: string;
  text: string;
  description?: string;
  status: TaskStatus;
}

export type TaskStatus = 'InProgress' | 'Completed';

@Injectable({
  providedIn: 'root',
})
export class ToDoListTasksService {
  private apiUrl: string = 'http://localhost:3000/tasks';
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
      status: 'InProgress',
    };

    return this.http.post<Task>(this.apiUrl, newTask);
  }

  deleteTaskById(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }

  updateTitleById(id: string, text: string): Observable<Partial<Task>> {
    return this.http.patch<Partial<Task>>(`${this.apiUrl}/${id}`, { text })
  }

  changeStatusById(id: string, currentStatus: TaskStatus): Observable<Task> {
    const newStatus: TaskStatus = currentStatus === 'InProgress' ? 'Completed' : 'InProgress';
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { status: newStatus });
  }

}
