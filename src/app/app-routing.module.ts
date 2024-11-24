import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToDoListComponent} from "./modules/tasks/to-do-list/to-do-list.component";
import {ToDoListDescriptionComponent} from "./modules/tasks/to-do-list-description/to-do-list-description.component";
import {BoardComponent} from "./modules/board/board/board.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: ToDoListComponent,
    children: [
      {
        path: ':id',
        component: ToDoListDescriptionComponent,
      },
    ],
  },
  {
    path: 'board',
    component: BoardComponent,
    //loadComponent: () => import('./components/board/board.component').then((c) => c.BoardComponent),
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
