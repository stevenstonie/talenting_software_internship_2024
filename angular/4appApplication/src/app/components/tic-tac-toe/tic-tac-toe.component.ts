import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicTacToeGameState } from 'src/app/models/models';
import { TicTacToeService } from 'src/app/services/tic-tac-toe.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  hasGameStarted = false;
  playsVsComputer = false;

  currentPlayer: TicTacToeGameState['nextPlayer'] = 'X';
  winner: TicTacToeGameState['winner'] = null;
  hoveredSquare: number | null = null;
  gridSelections: TicTacToeGameState['gridSelections'] = Array(9).fill(null);
  winningSquares: TicTacToeGameState['winningSquares'] = [];

  private gameState: Subscription = new Subscription();

  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit(): void {
    this.gameState = this.ticTacToeService.gameState.subscribe(state => {
      this.currentPlayer = state.nextPlayer;
      this.gridSelections = state.gridSelections;
      this.winner = state.winner;
      this.winningSquares = state.winningSquares;
    })
  }

  mouseHovering(index: number) {
    this.hoveredSquare = index;
  }

  mouseNotHovering() {
    this.hoveredSquare = null;
  }

  selectSquare(index: number) {
    if (this.gridSelections[index] === null && this.winner === null) {
      this.ticTacToeService.selectSquare(index, this.currentPlayer);
    }
  }

  startNewGame() {
    this.ticTacToeService.startNewGame();

    this.hasGameStarted = true;
  }

  exitGame() {
    this.hasGameStarted = false;
  }

  ngOnDestroy(): void {
    this.gameState.unsubscribe();
  }
}
