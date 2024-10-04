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
  selectedItemId: number | null = null;
  tasks: any[] = [];
  selectedStatus: string | null = null;

  constructor(private todoListTasksService: ToDoListTasksService, private toastService: ToastsService) {}

  ngOnInit() {
    setTimeout(() => {this.isLoading = false;}, 500);

    this.todoListTasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(idDel: number) {
    this.todoListTasksService.deleteTaskById(idDel);
    //this.tasks = this.todoListTasksService.getTasks();
    this.toastService.addToast('Задание удалено', 2, 10000);

    if (this.selectedItemId === idDel) {
      this.selectedItemId = null;
    }
  }

  selectItem(selectedId: number) {
    this.selectedItemId = selectedId;
  }

}
