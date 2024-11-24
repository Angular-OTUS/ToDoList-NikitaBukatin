import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ToDoListTasksService, Task, TaskStatus} from "../../../services/to-do-list-tasks.service";
import {catchError, count, filter, of, Subject, takeUntil} from "rxjs";
import {ToastsService} from "../../../services/toasts.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  //standalone: true,
})
export class BoardComponent implements OnInit, OnDestroy {
  public allTasks: Task[] = [];
  public inProgressTasks?: Task[] = [];
  public completeTasks?: Task[] = [];
  private taskService = inject(ToDoListTasksService);
  private toastService = inject(ToastsService);
  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks() {
    this.taskService.getTasks()
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.toastService.addToast('Ошибка при загрузке заданий', 2, 5000)
          return of(null);
        }),
        filter(result => !!result),
      )
      .subscribe(tasks => {
        this.allTasks = tasks!;
        this.inProgressTasks = tasks!.filter(task => task.status === 'InProgress');
        this.completeTasks = tasks!.filter(task => task.status === 'Completed');
      });
  }

  public refreshTaskList(): void {
    this.getTasks();
  }

  public deleteTask(idDel: string) : void {
    this.taskService.deleteTaskById(idDel)
      .pipe(takeUntil(this.destroy$),
        catchError(() => {
          this.toastService.addToast('Ошибка при удалении задания', 2, 5000)
          return of(null);
        }),
        filter(result => !!result),
      )
      .subscribe(() => {
        this.toastService.addToast('Задание удалено', 2, 10000);
        this.refreshTaskList();
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
