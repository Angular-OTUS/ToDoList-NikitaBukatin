import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task, ToDoListTasksService} from "../../../services/to-do-list-tasks.service";
import {ToastsService} from "../../../services/toasts.service";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter, iif,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil
} from "rxjs";
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
  selectedStatus$ = new BehaviorSubject<string | null>(null);
  filteredTasks$?: Observable<Task[]>;

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

    this.filteredTasks$ = combineLatest([this.tasks$, this.selectedStatus$]).pipe(
      map( ([tasks, selectedStatus]) => tasks.filter((task: Task) => !selectedStatus || task.status === selectedStatus)),
    )

    this.route.firstChild?.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params =>
          iif(
            () => !!params['id'],
            of(params['id']),
            of(null)
          )
        )
      )
      .subscribe(selectedId => {
        this.selectedItemId = selectedId;
      });
  }

  public selectItem(selectedId: string): void {
    this.selectedItemId = selectedId;
    this.router.navigate([selectedId], {relativeTo: this.route});
  }

  public onFilterChange(status: string | null): void {
    this.selectedStatus$.next(status);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
