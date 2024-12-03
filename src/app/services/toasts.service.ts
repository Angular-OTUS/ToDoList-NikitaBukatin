import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
export interface Toast { id: number, text: string, type: number, isVisible: boolean}

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();
  private currentToastId: number = 0;

  public addToast (text: string, type: number, lifeTime: number): number {
    const toastId: number = ++this.currentToastId;
    const newToast: Toast = {id: toastId, text: text, type: type, isVisible: true};
    const currentToast = this.toastsSubject.getValue();
    this.toastsSubject.next([...currentToast, newToast]);
    setTimeout(() => this.hideToastById(toastId), lifeTime);

    return toastId;
  }

  public hideToastById(toastId: number): void {
    const currentToasts = this.toastsSubject.getValue();
    const toast = currentToasts.find(t => t.id === toastId);
    if (toast) {
      toast.isVisible = false;
    }
  }

  public removeToastById(toastId: number): void {
    const currentToasts = this.toastsSubject.getValue();
    const updatedToasts = currentToasts.filter(toast => toast.id !== toastId);
    this.toastsSubject.next(updatedToasts);
  }

}
