import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  private toasts: { id: number, text: string, type: number, isVisible: boolean}[] = [];
  private currentToastId = 0;

  constructor() { }

  getToasts() {
    return this.toasts;
  }

  addToast (text: string, type: number, lifeTime: number) {
    const toastId = ++this.currentToastId;
    this.toasts.push({id: toastId, text: text, type: type, isVisible: true})
    const addedToast = this.toasts[this.toasts.length - 1];
    setTimeout(() => {
      //this.removeToastById(toastId);
      addedToast.isVisible = false;
    }, lifeTime);

    return toastId;
  }

  removeToastById(toastId: number) {
    const index = this.toasts.findIndex(toast => toast.id === toastId);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }
  }

}
