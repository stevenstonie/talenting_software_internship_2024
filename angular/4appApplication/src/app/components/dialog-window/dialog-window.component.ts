import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Output() closeWindow = new EventEmitter();

  closeThisWindow() {
    this.closeWindow.emit();
  }
}

export interface DialogWindow {
  title: string;
  message: string;
  isDialogWindowOpened: boolean
}