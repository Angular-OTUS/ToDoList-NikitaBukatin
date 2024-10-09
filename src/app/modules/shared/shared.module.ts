import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ButtonComponent} from "./button/button.component";
import { PromptDirective } from './prompt/prompt.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [ButtonComponent, PromptDirective, LoadingSpinnerComponent],
    imports: [
        CommonModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
    ],
  exports: [ButtonComponent, PromptDirective, LoadingSpinnerComponent],
})
export class SharedModule { }
