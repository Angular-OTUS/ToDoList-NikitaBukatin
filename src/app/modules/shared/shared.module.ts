import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ButtonComponent} from "./button/button.component";
import { PromptDirective } from './prompt/prompt.directive';



@NgModule({
  declarations: [ButtonComponent, PromptDirective],
  imports: [
    CommonModule,
    MatButtonToggleModule,
  ],
  exports: [ButtonComponent, PromptDirective],
})
export class SharedModule { }
