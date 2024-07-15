import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  gameStarted = false;
  playsVsComputer = false;
  currentPlayer: 'X' | 'O' = 'X';
  hoveredSquare: number | null = null;

  mouseHovering(index: number) {
    this.hoveredSquare = index;
  }

  mouseNotHovering() {
    this.hoveredSquare = null;
  }

  startNewGame() {
    this.gameStarted = true;
  }

  exitGame() {
    this.gameStarted = false;
  }
}
