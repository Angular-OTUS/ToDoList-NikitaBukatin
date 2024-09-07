import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ButtonComponent} from "./button/button.component";



@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    MatButtonToggleModule,
  ],
  exports: [ButtonComponent],
})
export class SharedModule { }
