import {Component, EventEmitter, Input, Output} from '@angular/core';

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

  deleteItem(id: number) {
    this.newItemDelete.emit(id);
  }
}
