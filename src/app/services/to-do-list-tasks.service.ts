import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

export interface Task {
  id: number;
  text: string;
  description: string | null;
  status: "InProgress" | "Completed";
}

@Injectable({
  providedIn: 'root'
})
export class ToDoListTasksService {
  private apiUrl = 'http://localhost:3000/tasks';
  http = inject(HttpClient);
  //constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  getTaskById(id: number): Observable<Task[]> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Task[]>(`${this.apiUrl}`, {
      params
    });
  }

  setTask(taskText: string, taskDescription: string | null): Observable<Task> {
    const newTask = {
      text: taskText.trim(),
      description: taskDescription,
      status: 'InProgress'
    };

    return this.http.post<Task>(this.apiUrl, newTask);
  }

  deleteTaskById(id: number): Observable<Task> {
    console.log(id);
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }

  updateTitleById(id: number, text: string): Observable<Partial<Task>> {
    const taskUpdate = { text };
    return this.http.patch<Partial<Task>>(`${this.apiUrl}/${id}`, taskUpdate)
  }

  changeStatusById(id:number) {
    this.http.get<Task>(`${this.apiUrl}/${id}`).subscribe(task => {
      const newStatus = task.status === 'InProgress' ? 'Completed' : 'InProgress';
      const updatedTask = { ...task, status: newStatus };

      this.http.patch<Task>(`${this.apiUrl}/${id}`, updatedTask).subscribe();
    });
  }
}
