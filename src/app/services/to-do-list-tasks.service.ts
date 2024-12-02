import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
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
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  http: HttpClient = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`)
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks)),
      );
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

    return this.http.post<Task>(this.apiUrl, newTask)
      .pipe(
        tap((createdTask) => {
          const currentTasks = this.tasksSubject.getValue();
          this.tasksSubject.next([...currentTasks, createdTask]);
        })
      );
  }

  deleteTaskById(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const updatedTask = this.tasksSubject.value.filter((task) => task.id !== id);
          this.tasksSubject.next(updatedTask);
        })
      );
  }

  updateTitleById(id: string, text: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { text })
      .pipe(
        tap(() => {
          const currentTasks = this.tasksSubject.getValue();
          const updatedTasks = currentTasks.map(task =>
            task.id === id ? { ...task, text } : task
          );
          this.tasksSubject.next(updatedTasks);
        })
      );
  }

  changeStatusById(id: string, currentStatus: TaskStatus): Observable<Task> {
    const newStatus: TaskStatus = this.changeStatus(currentStatus);
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { status: newStatus })
      .pipe(
        tap(() => {
            const currentTasks = this.tasksSubject.getValue();
            const updatedTasks = currentTasks.map(task =>
              task.id === id ? { ...task, status: newStatus } : task
            );
            this.tasksSubject.next(updatedTasks);
          })
        );
  }

  private changeStatus(status: TaskStatus): TaskStatus {
    return status === 'InProgress' ? 'Completed' : 'InProgress';
  }

}
