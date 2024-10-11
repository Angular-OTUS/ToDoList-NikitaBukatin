import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task, ToDoListTasksService} from "../../services/to-do-list-tasks.service";
import {ToastsService} from "../../services/toasts.service";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  title:  string = "Список задач:";
  isLoading: boolean = true;
  selectedItemId: string | null = null;
  tasks: Task[] = [];
  selectedStatus: string | null = null;

  constructor(private todoListTasksService: ToDoListTasksService, private toastService: ToastsService, private router: Router, private route: ActivatedRoute) {
    this.todoListTasksService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    })
  }

  public ngOnInit(): void {
    setTimeout(() => {this.isLoading = false;}, 500);

    this.route.firstChild?.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
      if (params['id']) {
        this.selectedItemId = params['id'];
      } else this.selectedItemId = null;
      });
  }

  public refreshTaskList(): void {
    this.todoListTasksService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  public deleteTask(idDel: string) : void {
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
            this.router.navigate(['/tasks']);
            this.selectedItemId = null;
          }
          this.refreshTaskList();
        }
    })
  }

  public selectItem(selectedId: string): void {
    this.selectedItemId = selectedId;
    this.router.navigate([selectedId], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
