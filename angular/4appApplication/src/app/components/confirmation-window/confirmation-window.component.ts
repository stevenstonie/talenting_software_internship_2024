import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-window',
  templateUrl: './confirmation-window.component.html',
  styleUrls: ['./confirmation-window.component.scss']
})
export class ConfirmationWindowComponent {
  @Input() title!: string;
  @Input() message!: string;

  closeThisWindow() {
    window.close();
  }
}
