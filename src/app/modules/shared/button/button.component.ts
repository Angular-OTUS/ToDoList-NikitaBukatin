import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
 @Input() buttonDisabled  = false;
 @Input() heightButton  = "";
 @Output() newButtonClick = new EventEmitter<boolean>;

  buttonClick() {
    this.newButtonClick.emit();
  }
}
