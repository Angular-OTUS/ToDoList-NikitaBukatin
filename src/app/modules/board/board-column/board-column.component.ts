import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../services/to-do-list-tasks.service";

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent {
  @Input({required: true}) Tasks?: Task[];
  @Output() DeleteTaskId = new EventEmitter<string>();
  @Output() ChangeEmit = new EventEmitter<boolean>();

  public deleteTask(taskId: string): void {
    this.DeleteTaskId.emit(taskId);
  }

  public refreshTaskList() {
    this.ChangeEmit.emit();
  }
}
