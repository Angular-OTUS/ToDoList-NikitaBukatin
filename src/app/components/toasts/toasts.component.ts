import { Component, OnInit } from '@angular/core';
import {ToastsService} from "../../services/toasts.service";

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {
  constructor( private toastService : ToastsService) {}

  getToasts() {
    return this.toastService.toasts;
  }

  removeToasts(index: number) {
   this.toastService.removeToastWithFade(index);
  }

  getToastClass(type: number): string {
    switch (type) {
      case 1: return 'toast-success';
      case 2: return 'toast-delete';
      default: return 'toast-info'
    }
  }
}
