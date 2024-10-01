import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoListTasksService {

  constructor() { }

  private tasks: {id: number, text: string, description: string | null}[] = [
    { id: 1, text: "Задача 1", description: "Описание первой задачи"},
    { id: 2, text: "Задача 2", description: "Описание второй задачи"},
    { id: 3, text: "Задача 3", description: "Описание третьей задачи"}
  ];

  setTask(taskText: string, taskDescription: string | null) {
    this.tasks.push({ id: this.tasks.length + 1, text: taskText.trim(), description: taskDescription});
  }

  getTasks() {
    return this.tasks;
  }

  getTaskById(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  deleteTaskById(id: number) {
    this.tasks = this.tasks.filter(item => item.id !== id);
  }

}
