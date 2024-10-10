import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ToastsService} from "../../services/toasts.service";
import {Task, ToDoListTasksService} from "../../services/to-do-list-tasks.service";
import {catchError, of, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss']
})
export class ToDoListItemComponent implements OnDestroy {
  @Input({required: true}) listItem!: Task;
  @Input() secondItem?: boolean;
  @Input() isSelected?: boolean;
  @Output() newItemDelete: EventEmitter<number> = new EventEmitter<number>();
  private destroy$: Subject<void> = new Subject<void>();
  isEdit: boolean = false;
  editedTitle: string = '';

  constructor(private toastService : ToastsService, private todoListTasksService: ToDoListTasksService) {}

  public deleteItem(id: number): void {
    this.newItemDelete.emit(id);
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
            })
          )
          .subscribe((result) => {
            if (result) {
              this.toastService.addToast('Задание изменено', 1, 10000);
            }
          });
      }
      this.isEdit = false;
    }
  }
  public onStatusChange(): void {
    this.todoListTasksService.changeStatusById(this.listItem.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
