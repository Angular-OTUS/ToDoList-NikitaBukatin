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
  currentDescription?: string | null = null;
  tasks: any[] = [];
  selectedStatus: string | null = null;

  constructor(private todoListTasksService: ToDoListTasksService, private toastService: ToastsService) {
    this.todoListTasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  ngOnInit(): void {
    setTimeout(() => {this.isLoading = false;}, 500);

    /*this.todoListTasksService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.todoListTasksService.getTasks();*/
  }

  refreshTaskList(): void {
    this.todoListTasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(idDel: number) {
    this.todoListTasksService.deleteTaskById(idDel).subscribe(() => {
      this.refreshTaskList();
    });
    this.toastService.addToast('Задание удалено', 2, 10000);
    if (this.selectedItemId === idDel) {
      this.selectedItemId = null;
    }
  }

  selectItem(selectedId: number, desc?: string | null) {
    this.selectedItemId = selectedId;
    this.currentDescription = desc;
  }

}
