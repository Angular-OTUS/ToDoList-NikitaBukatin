import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

export interface Task {
  id: number;
  text: string;
  description?: string;
  status: TaskStatus;
}

export type TaskStatus = 'InProgress' | 'Completed';

@Injectable({
  providedIn: 'root'
})
export class ToDoListTasksService {
  private apiUrl: string = 'http://localhost:3000/tasks';
  http: HttpClient = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  getTaskById(id: number): Observable<Task[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Task[]>(`${this.apiUrl}`, {
      params
    });
  }

  setTask(taskText: string, taskDescription?: string): Observable<Task> {
    const newTask: Omit<Task, 'id'> = {
      text: taskText.trim(),
      description: taskDescription,
      status: 'InProgress'
    };

    return this.http.post<Task>(this.apiUrl, newTask);
  }

  deleteTaskById(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }

  updateTitleById(id: number, text: string): Observable<Partial<Task>> {
    return this.http.patch<Partial<Task>>(`${this.apiUrl}/${id}`, { text })
  }

  changeStatusById(id:number): void {
    this.http.get<Task>(`${this.apiUrl}/${id}`).subscribe(task => {
      const newStatus: TaskStatus = task.status === 'InProgress' ? 'Completed' : 'InProgress';
      const updatedTask: Task = { ...task, status: newStatus };

      this.http.patch<Task>(`${this.apiUrl}/${id}`, updatedTask).subscribe();
    });
  }
}
