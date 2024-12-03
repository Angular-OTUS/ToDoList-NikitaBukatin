import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {ToDoListTasksService} from "../../../services/to-do-list-tasks.service";
import {ToastsService} from "../../../services/toasts.service";
import {NgForm} from "@angular/forms";
import {catchError, filter, of, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-to-do-create-item',
  templateUrl: './to-do-create-item.component.html',
  styleUrls: ['./to-do-create-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoCreateItemComponent  implements OnDestroy{
  //@Output() taskAdded: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('taskForm') taskForm?: NgForm;
  public newTask: string = '';
  public newDescription: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private todoListTasksService: ToDoListTasksService, private toastService: ToastsService) {}

  public addTask(): void {
    if (this.taskForm?.valid) {
      this.todoListTasksService.setTask(this.newTask.trim(), this.newDescription)
        .pipe(
          takeUntil(this.destroy$),
          catchError(() => {
            this.toastService.addToast('Ошибка при добавлении задания', 2, 5000)
            return of(null);
          }),
          filter(result => !!result),
        )
        .subscribe(() => {
            this.toastService.addToast('Задание создано', 1, 10000);
            this.taskForm?.resetForm();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
