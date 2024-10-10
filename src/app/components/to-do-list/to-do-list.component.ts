import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task, ToDoListTasksService} from "../../services/to-do-list-tasks.service";
import {ToastsService} from "../../services/toasts.service";
import {catchError, of, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  title:  string = "Список задач:";
  isLoading: boolean = true;
  selectedItemId: number | null = null;
  currentDescription?: string;
  tasks: Task[] = [];
  selectedStatus: string | null = null;

  constructor(private todoListTasksService: ToDoListTasksService, private toastService: ToastsService) {
    this.todoListTasksService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    })
  }

  public ngOnInit(): void {
    setTimeout(() => {this.isLoading = false;}, 500);
  }

  public refreshTaskList(): void {
    this.todoListTasksService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  public deleteTask(idDel: number) : void {
    this.todoListTasksService.deleteTaskById(idDel)
      .pipe(takeUntil(this.destroy$),
        catchError(() => {
          this.toastService.addToast('Ошибка при удалении задания', 2, 5000)
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.toastService.addToast('Задание удалено', 2, 10000);
          if (this.selectedItemId === idDel) {
            this.selectedItemId = null;
            this.refreshTaskList();
          }
        }
    })
  }

  public selectItem(selectedId: number, desc?: string): void {
    this.selectedItemId = selectedId;
    this.currentDescription = desc;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
