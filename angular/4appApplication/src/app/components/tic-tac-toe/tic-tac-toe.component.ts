import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  gameStarted = false;
  playsVsComputer = false;


  startNewGame() {
    this.gameStarted = true;
  }

  exitGame() {
    this.gameStarted = false;
  }
}
