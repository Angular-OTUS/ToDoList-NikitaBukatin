import {Component, Input} from '@angular/core';
import {ToDoListTasksService} from "../../services/to-do-list-tasks.service";

@Component({
  selector: 'app-to-do-list-description',
  templateUrl: './to-do-list-description.component.html',
  styleUrls: ['./to-do-list-description.component.scss']
})
export class ToDoListDescriptionComponent {
  @Input() selectedItemId : number | null = null;
  selectedTaskDescription: string | null | undefined;

  constructor(private todoListTasksService: ToDoListTasksService) {}

  getSelectedTaskDescription() {
    if (this.selectedItemId !== null) {
      this.todoListTasksService.getTaskById(this.selectedItemId).subscribe((task) => {
        this.selectedTaskDescription = task?.description;
      });
    } else {
      this.selectedTaskDescription = undefined;
    }
  }
}
