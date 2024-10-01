import {Component, OnInit} from '@angular/core';
import {ToDoListTasksService} from "../../services/to-do-list-tasks.service";
import {ToastsService} from "../../services/toasts.service";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  title = "Список задач:";
  isLoading = true;
  newTask = '';
  newDescription = '';
  selectedItemId: number | null = null;
  tasks: any[] = [];

  constructor(private todoListTasksService: ToDoListTasksService, private toastService: ToastsService) {}

  ngOnInit() {
    setTimeout(() => {this.isLoading = false;}, 500);

    this.tasks = this.todoListTasksService.getTasks();
  }

  addTask() {
    if (this.newTask.trim()) {
      this.todoListTasksService.setTask(this.newTask.trim(), this.newDescription);
      this.toastService.showToast('Задание создано', 1);
      this.newTask = '';
      this.newDescription = '';
    }
  }

  deleteTask(idDel: number) {
    this.todoListTasksService.deleteTaskById(idDel);
    this.tasks = this.todoListTasksService.getTasks();
    this.toastService.showToast('Задание удалено', 2);

    if (this.selectedItemId === idDel) {
      this.selectedItemId = null;
    }
  }

  selectItem(selectedId: number) {
    this.selectedItemId = selectedId;
  }

}
