import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './modules/tasks/to-do-list/to-do-list.component';
import { FormsModule } from "@angular/forms";
import { ToDoListItemComponent } from './modules/shared/to-do-list-item/to-do-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {SharedModule} from "./modules/shared/shared.module";
import { ToDoListDescriptionComponent } from './modules/tasks/to-do-list-description/to-do-list-description.component';
import { ToastsComponent } from './modules/shared/toasts/toasts.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import { ToDoCreateItemComponent } from './modules/tasks/to-do-create-item/to-do-create-item.component';
import {HttpClientModule} from "@angular/common/http";
import {MatRadioModule} from "@angular/material/radio";
import { BoardComponent } from './modules/board/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoListItemComponent,
    ToDoListDescriptionComponent,
    ToastsComponent,
    ToDoCreateItemComponent,
    BoardComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatButtonToggleModule,
        SharedModule,
        MatCheckboxModule,
        MatSelectModule,
        HttpClientModule,
        MatRadioModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
