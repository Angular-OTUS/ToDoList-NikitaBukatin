import { Component } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {
  tasks: string[] = ['создать новый проект ангулар', 'создать новый компонент ToDoList в папке components'
    , 'добавить новый компонент через селектор в шаблон bootstrap компонента', 'добавить разметку в шаблон компонента ToDoList на моё усмотрение'
  , 'добавление новых заданий по кнопке или Enter'];
  newTask: string = '';
  deleteFlag: boolean = false;

  secondType = function (e: number) : boolean {
    return e % 2 === 0 ?? true;
  };
  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }
}
