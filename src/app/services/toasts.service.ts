import { Injectable } from '@angular/core';
export interface Toast { id: number, text: string, type: number, isVisible: boolean}

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  private toasts: Toast[] = [];
  private currentToastId: number = 0;

  getToasts(): Toast[] {
    return this.toasts;
  }

  addToast (text: string, type: number, lifeTime: number): number {
    const toastId: number = ++this.currentToastId;
    this.toasts.push({id: toastId, text: text, type: type, isVisible: true})
    const addedToast = this.toasts[this.toasts.length - 1];
    setTimeout(() => {
      addedToast.isVisible = false;
    }, lifeTime);

    return toastId;
  }

  removeToastById(toastId: number): void {
    const index : number = this.toasts.findIndex(toast => toast.id === toastId);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }
  }

}
