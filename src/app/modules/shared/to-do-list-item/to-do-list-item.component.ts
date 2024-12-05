import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import {ToastsService} from "../../../services/toasts.service";
import {Task, ToDoListTasksService} from "../../../services/to-do-list-tasks.service";
import {catchError, filter, of, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItemComponent implements OnDestroy {
  @Input({required: true}) listItem!: Task;
  @Input() secondItem?: boolean;
  @Input() isSelected?: boolean;
  public isEdit: boolean = false;
  public editedTitle: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private toastService : ToastsService, private todoListTasksService: ToDoListTasksService, private elementRef: ElementRef, private router: Router) {}

  public deleteItem(id: string): void {
    this.todoListTasksService.deleteTaskById(id)
      .pipe(takeUntil(this.destroy$),
        catchError(() => {
          this.toastService.addToast('Ошибка при удалении задания', 2, 5000)
          return of(null);
        }),
        filter(result => !!result),
      )
      .subscribe(() => {
        this.toastService.addToast('Задание удалено', 2, 10000);
        if (this.isSelected) {
          this.router.navigate(['/tasks']);
        }
      })
  }

  public editTask(): void {
    this.isEdit = true;
    this.editedTitle = this.listItem.text;
  }

  public saveTask(): void {
    if (this.editedTitle.trim()) {
      if (this.listItem.text !== this.editedTitle) {
        this.listItem.text = this.editedTitle;
        this.todoListTasksService.updateTitleById(this.listItem.id, this.listItem.text)
          .pipe(
            takeUntil(this.destroy$),
            catchError(() => {
              this.toastService.addToast('Ошибка при изменении задания', 2, 5000)
              return of(null);
            }),
            filter(result => !!result),
          )
          .subscribe(() => {
              this.toastService.addToast('Задание изменено', 1, 10000);
          });
      }
      this.isEdit = false;
    }
  }

  public onStatusChange(task: Task): void {
    this.todoListTasksService.changeStatusById(task.id, task.status)
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.toastService.addToast('Ошибка при изменении статуса', 2, 5000);
          return of(null);
        }),
        filter(result => !!result),
      )
      .subscribe();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isEdit = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
