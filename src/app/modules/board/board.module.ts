import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import {BoardComponent} from "./board/board.component";
import {SharedModule} from "../shared/shared.module";
import {BoardColumnComponent} from "./board-column/board-column.component";


@NgModule({
  declarations: [
    BoardComponent,
    BoardColumnComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule,
  ],
  exports: [
    BoardComponent,
    BoardColumnComponent,
  ]
})
export class BoardModule { }
