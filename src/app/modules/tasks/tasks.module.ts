import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import {ToDoListComponent} from "./to-do-list/to-do-list.component";
import {ToDoListDescriptionComponent} from "./to-do-list-description/to-do-list-description.component";
import {SharedModule} from "../shared/shared.module";
import {ToDoCreateItemComponent} from "./to-do-create-item/to-do-create-item.component";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [
    ToDoListComponent,
    ToDoCreateItemComponent,
    ToDoListDescriptionComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
  ],
  exports: [
    ToDoListComponent,
    ToDoCreateItemComponent,
    ToDoListDescriptionComponent,
  ]
})
export class TasksModule { }
