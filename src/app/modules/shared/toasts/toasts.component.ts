import {Component, OnInit} from '@angular/core';
import {Toast, ToastsService} from "../../../services/toasts.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs";

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-10px)',
      })),
      transition('visible => hidden', [
        animate('500ms ease-out'),
      ]),
      transition('hidden => visible', [
        animate('500ms ease-in'),
      ]),
    ]),
  ],
})
export class ToastsComponent implements OnInit {
  public toasts$?: Observable<Toast[]>;

  constructor( protected toastService : ToastsService) {}

  ngOnInit(): void {
    this.toasts$ = this.toastService.toasts$;
  }

  toastFade(toastId: number): void {
    this.toastService.hideToastById(toastId);
  }

  onAnimationDone(event: any, toastId: number): void {
    if (event.toState === 'hidden') {
      this.toastService.removeToastById(toastId);
    }
  }

  getToastClass(type: number): string {
    switch (type) {
      case 1: return 'toast-success';
      case 2: return 'toast-delete';
      default: return 'toast-info'
    }
  }
}
