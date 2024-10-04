import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ToDoListComponent} from "../components/to-do-list/to-do-list.component";

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
  tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  /*private tasks: {id: number, text: string, description: string | null, status: "InProgress" | "Completed"}[] = [
    { id: 1, text: "Задача 1", description: "Описание первой задачи", status: "InProgress" },
    { id: 2, text: "Задача 2", description: "Описание второй задачи", status: "Completed" },
    { id: 3, text: "Задача 3", description: "Описание третьей задачи", status: "InProgress" },
  ];*/

  setTask(taskText: string, taskDescription: string | null): void {
    const newTask = { text: taskText.trim(), description: taskDescription, status: "InProgress" };
    this.http.post<Task>(this.apiUrl, newTask).subscribe((createdTask) => {
      this.tasks.push(createdTask);
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(this.apiUrl + '/${id}');
  }

  deleteTaskById(id: number): void {
    this.http.delete(`http://localhost:3000/tasks/${id}`).subscribe(() => {
      this.tasks = this.tasks.filter(item => item.id !== id);
    });
  }

  changeTaskStatus(id: number): void {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      const newStatus = task.status === "InProgress" ? "Completed" : "InProgress";
      this.http.patch(`http://localhost:3000/tasks/${id}`, { status: newStatus })
        .subscribe(updatedTask => {
          task.status = newStatus;
        });
    }
  }

}
