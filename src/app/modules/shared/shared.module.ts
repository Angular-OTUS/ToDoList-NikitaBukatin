import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ButtonComponent} from "./button/button.component";
import { PromptDirective } from './prompt/prompt.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ToastsComponent} from "./toasts/toasts.component";
import {ToDoListItemComponent} from "./to-do-list-item/to-do-list-item.component";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [ButtonComponent, PromptDirective, LoadingSpinnerComponent, ToastsComponent, ToDoListItemComponent],
    imports: [
        CommonModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatSelectModule,
        MatRadioModule,
        FormsModule,
    ],
  exports: [ButtonComponent, PromptDirective, LoadingSpinnerComponent, ToastsComponent, ToDoListItemComponent],
})
export class SharedModule { }
