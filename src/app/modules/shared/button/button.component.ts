import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
 @Input() buttonDisabled: boolean  = false;
 @Input() heightButton: string  = "";
 @Output() newButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>;

  buttonClick(event: Event): void {
    event.stopPropagation();
    this.newButtonClick.emit();
  }
}
