import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appPrompt]'
})
export class PromptDirective {
  @Input('appPrompt') promptText = '';
  promptElement!: HTMLElement | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.promptElement) {
      this.showPrompt();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.promptElement) {
      this.hidePrompt();
    }
  }

  private showPrompt() {
    this.promptElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.promptElement,
      this.renderer.createText(this.promptText)
    );
    this.renderer.appendChild(this.el.nativeElement, this.promptElement);

    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    this.renderer.setStyle(this.promptElement, 'position', 'absolute');
    this.renderer.setStyle(this.promptElement, 'background-color', '#737373');
    this.renderer.setStyle(this.promptElement, 'color', '#fff');
    this.renderer.setStyle(this.promptElement, 'font-size', '12px');
    this.renderer.setStyle(this.promptElement, 'padding', '5px');
    this.renderer.setStyle(this.promptElement, 'border-radius', '5px');
    this.renderer.setStyle(this.promptElement, 'top', '100%');
    this.renderer.setStyle(this.promptElement, 'left', '50%');
    this.renderer.setStyle(this.promptElement, 'transform', 'translateX(-50%)');
    this.renderer.setStyle(this.promptElement, 'z-index', '10');
  }

  private hidePrompt() {
    this.renderer.removeChild(this.el.nativeElement, this.promptElement);
    this.promptElement = null;
  }
}
