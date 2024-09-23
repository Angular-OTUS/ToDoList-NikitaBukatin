import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToastsService} from "../../services/toasts.service";

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss']
})
export class ToDoListItemComponent {
  @Input({required: true}) listItem! : {id: number, text: string , description: string};
  @Input() secondItem  = false;
  @Input() isSelected  = false;
  @Output() newItemDelete = new EventEmitter<number>();
  isEdit = false;
  editedTitle = '';

  constructor(private toastService : ToastsService) {}

  deleteItem(id: number) {
    this.newItemDelete.emit(id);
  }

  editTask() {
    this.isEdit = true;
    this.editedTitle = this.listItem.text;
  }

  saveTask() {
    if (this.editedTitle.trim()) {
      this.listItem.text = this.editedTitle;
      this.toastService.showToast('Задание изменено', 1);
      this.isEdit = false;
    }
  }
}
