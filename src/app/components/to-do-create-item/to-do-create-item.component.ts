import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ToDoListTasksService} from "../../services/to-do-list-tasks.service";
import {ToastsService} from "../../services/toasts.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-to-do-create-item',
  templateUrl: './to-do-create-item.component.html',
  styleUrls: ['./to-do-create-item.component.scss']
})
export class ToDoCreateItemComponent {
  @Output() taskAdded: EventEmitter<void> = new EventEmitter<void>();
  newTask = '';
  newDescription = '';
  @ViewChild('taskForm') taskForm?: NgForm;

  constructor(private todoListTasksService: ToDoListTasksService, private toastService: ToastsService) {}

  addTask() {
    if (this.taskForm?.valid) {
      this.todoListTasksService.setTask(this.newTask.trim(), this.newDescription).subscribe(() => {
        this.taskAdded.emit();
      });
      this.toastService.addToast('Задание создано', 1, 10000);
      this.taskForm.resetForm();
    }
  }
}
