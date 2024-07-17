import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TicTacToeGameState } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  private gameStateSubject = new BehaviorSubject<TicTacToeGameState>(this.getInitialGameState());
  gameState = this.gameStateSubject.asObservable();

  winner: TicTacToeGameState['winner'] = null;
  nextPlayer: TicTacToeGameState['nextPlayer'] = 'X';
  gridSelections: TicTacToeGameState['gridSelections'] = Array(9).fill(null);
  winningSquares: TicTacToeGameState['winningSquares'] = [];
  private combinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  private xSoundEffect = new Audio('assets/misc/X sound effect.mp3');
  private oSoundEffect = new Audio('assets/misc/O sound effect.mp3');
  private winSoundEffect = new Audio('assets/misc/win sound effect.mp3');

  constructor() { }

  selectSquare(index: number, player: 'X' | 'O') {
    if (this.gridSelections[index] !== null) {
      return;
    }

    this.gridSelections[index] = player;
    this.nextPlayer = player === 'X' ? 'O' : 'X';

    if (player === 'X') {
      this.xSoundEffect.play();
    } else {
      this.oSoundEffect.play();
    }

    this.updateGameState();
  }

  startNewGame() {
    this.nextPlayer = 'X';
    this.gridSelections = Array(9).fill(null);
    this.winner = null;
    this.winningSquares = [];

    this.updateGameState();
  }

  private updateGameState() {
    this.gameStateSubject.next({
      winner: this.checkForWinner(),
      gridSelections: this.gridSelections,
      nextPlayer: this.nextPlayer,
      winningSquares: this.winningSquares
    });
  }

  private checkForWinner(): TicTacToeGameState['winner'] {
    for (let combination of this.combinations) {
      const [a, b, c] = combination;

      if (this.gridSelections[a] && this.gridSelections[a] === this.gridSelections[b] && this.gridSelections[a] === this.gridSelections[c]) {
        this.winSoundEffect.play();

        this.winningSquares = combination;
        return this.gridSelections[a];
      }
    }

    if (this.gridSelections.every(square => square !== null)) {
      return 'DRAW';
    }
    return null;
  }

  private getInitialGameState(): TicTacToeGameState {
    return {
      winner: null,
      gridSelections: Array(9).fill(null),
      nextPlayer: 'X',
      winningSquares: []
    }
  }
}
