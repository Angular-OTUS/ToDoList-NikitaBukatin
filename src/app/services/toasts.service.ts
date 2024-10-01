import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor() { }

  public toasts: { id: number, text: string; type: number; }[] = [];

  showToast (text: string, type: number) {
    const toastId = Date.now();
    this.toasts.push({id: toastId, text: text, type: type})

    setTimeout(() => {
      this.removeToastWithFade(toastId);
    }, 10000);
  }

  removeToastById(toastId: number) {
    const index = this.toasts.findIndex(toast => toast.id === toastId);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }
  }

  removeToastWithFade(index: number) {
    const toastElement = document.getElementById(`toast-${index}`);

    if (toastElement) {
      toastElement.classList.add('fade-out');

      setTimeout(() => {
        this.removeToastById(index);
      }, 500);
    }
  }

}
