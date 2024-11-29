import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ToDoListTasksService, Task} from "../../../services/to-do-list-tasks.service";
import {catchError, filter, map, Observable, of, Subject, takeUntil} from "rxjs";
import {ToastsService} from "../../../services/toasts.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public tasks$?: Observable<Task[]>;
  public inProgressTasks$?: Observable<Task[]>;
  public completeTasks$?: Observable<Task[]>;
  public isLoading: boolean = true;
  private taskService = inject(ToDoListTasksService);
  private toastService = inject(ToastsService);
  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    setTimeout(() => {this.isLoading = false;}, 500);

    this.tasks$ = this.taskService.tasks$;
    this.getTasks();
    this.inProgressTasks$ = this.getFilteredTasks$('InProgress');
    this.completeTasks$ = this.getFilteredTasks$('Completed');
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
      .subscribe();
  }

  getFilteredTasks$(status: string): Observable<Task[]> | undefined {
    return this.tasks$?.pipe(
      map(tasks => tasks.filter(task => task.status === status))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
