import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-to-do-list-description',
  templateUrl: './to-do-list-description.component.html',
  styleUrls: ['./to-do-list-description.component.scss']
})
export class ToDoListDescriptionComponent {
  @Input({required: true}) description?: string | null = null;
}
