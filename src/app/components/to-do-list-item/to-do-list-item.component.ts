import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss']
})
export class ToDoListItemComponent {
  @Input({required: true}) listItem! : {id: number, text: string};
  @Output() newItemDelete = new EventEmitter<number>();
  deleteFlag: boolean = true;

  deleteItem(id: number) {
    this.newItemDelete.emit(id);
  }
  secondType = function (e: number) : boolean {
    return e % 2 === 0 ?? true;
  };
}
