import {Component, Input} from '@angular/core';
import {Task} from "../../../services/to-do-list-tasks.service";

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent {
  @Input({required: true}) Tasks?: Task[] | null;
  @Input() title: string = '';
}
