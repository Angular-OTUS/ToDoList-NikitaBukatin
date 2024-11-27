import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToDoListDescriptionComponent} from "./to-do-list-description/to-do-list-description.component";
import {ToDoListComponent} from "./to-do-list/to-do-list.component";

const routes: Routes = [
  {
    path: '',
    component: ToDoListComponent,
    children: [
      {
        path: ':id',
        component: ToDoListDescriptionComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
