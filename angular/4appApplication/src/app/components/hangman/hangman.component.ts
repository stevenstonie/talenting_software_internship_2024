import { Component } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent {
  gameStarted: boolean = false;



  startGame() {
    this.gameStarted = true;
  }

  exitGame() {
    this.gameStarted = false;
  }
}
