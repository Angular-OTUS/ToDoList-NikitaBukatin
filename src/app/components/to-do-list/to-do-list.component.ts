import { Component } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {
  title: string = "Список задач:";
  tasks: {id: number, text: string}[] = [
    { id: 1, text: "task1"},
    { id: 2, text: "task2"},
    { id: 3, text: "task3"},
  ];
  newTask: string = '';

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ id: this.tasks.length + 1, text: this.newTask.trim()});
      this.newTask = '';
    }
  }

  deleteTask(idDel: number) {
    this.tasks = this.tasks.filter(item => item.id !== idDel);
  }
}
