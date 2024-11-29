import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task, ToDoListTasksService} from "../../../services/to-do-list-tasks.service";
import {ToastsService} from "../../../services/toasts.service";
import {catchError, filter, Observable, of, Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  title:  string = "Список задач:";
  isLoading: boolean = true;
  selectedItemId: string | null = null;
  tasks$?: Observable<Task[]>;
  selectedStatus: string | null = null;

  constructor(private todoListTasksService: ToDoListTasksService, private toastService: ToastsService, private router: Router, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    setTimeout(() => {this.isLoading = false;}, 500);

    this.tasks$ = this.todoListTasksService.tasks$;
    this.todoListTasksService.getTasks()
      .pipe(takeUntil(this.destroy$),
        catchError(() => {
          this.toastService.addToast('Ошибка при загрузке заданий', 2, 5000)
          return of(null);
        }),
        filter(result => !!result),
      )
      .subscribe()

    this.route.firstChild?.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
      if (params['id']) {
        this.selectedItemId = params['id'];
      } else this.selectedItemId = null;
      });
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
