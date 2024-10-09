import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToastsService} from "../../services/toasts.service";
import {ToDoListTasksService} from "../../services/to-do-list-tasks.service";

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss']
})
export class ToDoListItemComponent {
  @Input({required: true}) listItem! : any;
  @Input() secondItem  = false;
  @Input() isSelected  = false;
  @Output() newItemDelete = new EventEmitter<number>();
  isEdit = false;
  editedTitle = '';

  constructor(private toastService : ToastsService, private todoListTasksService: ToDoListTasksService) {}

  deleteItem(id: number) {
    this.newItemDelete.emit(id);
  }

  editTask() {
    this.isEdit = true;
    this.editedTitle = this.listItem.text;
  }

  saveTask() {
    if (this.editedTitle.trim()) {
      if (this.listItem.text !== this.editedTitle) {
        this.listItem.text = this.editedTitle;
        this.todoListTasksService.updateTitleById(this.listItem.id, this.listItem.text).subscribe();
        this.toastService.addToast('Задание изменено', 1, 10000);
      }
      this.isEdit = false;
    }
  }
  onStatusChange() {
    this.todoListTasksService.changeStatusById(this.listItem.id);
  }
}
