import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToDoListComponent} from "./components/to-do-list/to-do-list.component";
import {ToDoListDescriptionComponent} from "./components/to-do-list-description/to-do-list-description.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: ToDoListComponent,
    children: [
      {
        path: ':id',
        component: ToDoListDescriptionComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'tasks',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
