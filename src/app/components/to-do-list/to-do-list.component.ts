import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  title = "Список задач:";
  isLoading = true;
  tasks: {id: number, text: string, description: string}[] = [
    { id: 1, text: "Задача 1", description: "Описание первой задачи"},
    { id: 2, text: "Задача 2", description: "Описание второй задачи"},
    { id: 3, text: "Задача 3", description: "Описание третьей задачи"}
  ];
  newTask = '';
  newDescription = '';
  selectedItemId: number | null = null;
  foundTask: any;

  ngOnInit() {
    setTimeout(() => {this.isLoading = false;}, 500);
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ id: this.tasks.length + 1, text: this.newTask.trim(), description: this.newDescription});
      this.newTask = '';
      this.newDescription = '';
    }
  }

  deleteTask(idDel: number) {
    this.tasks = this.tasks.filter(item => item.id !== idDel);

    if (this.selectedItemId === idDel) {
      this.selectedItemId = null;
    }
  }

  selectItem(selectedId: number) {
    this.selectedItemId = selectedId;
  }

  getSelectedTaskDescription(): string | undefined {
    const selectedTask = this.tasks.find(task => task.id === this.selectedItemId);
    return selectedTask ? selectedTask.description : undefined;
  }
}
