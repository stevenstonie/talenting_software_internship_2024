import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TicTacToeGameState } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  private gameStateSubject = new BehaviorSubject<TicTacToeGameState>(this.getInitialGameState());
  gameState = this.gameStateSubject.asObservable();

  winner: 'X' | 'O' | null = null;
  nextPlayer: 'X' | 'O' = 'X';
  gridSelections: ('X' | 'O' | null)[] = Array(9).fill(null);
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

  constructor() { }

  selectSquare(index: number, player: 'X' | 'O') {
    if (this.gridSelections[index] !== null) {
      return;
    }

    this.gridSelections[index] = player;
    this.nextPlayer = player === 'X' ? 'O' : 'X';

    this.updateGameState();
  }

  startNewGame() {
    this.nextPlayer = 'X';
    this.gridSelections = Array(9).fill(null);
    this.winner = null;

    console.log("SERVICE--------------------------------------------------");
    console.log('next player: ' + this.nextPlayer);
    console.log('winner: ' + this.winner);

    this.updateGameState();
  }

  exitGame() {
  }

  private updateGameState() {

    this.gameStateSubject.next({
      winner: this.checkForWinner(),
      gridSelections: this.gridSelections,
      nextPlayer: this.nextPlayer
    });
  }

  private checkForWinner(): 'X' | 'O' | null {
    for (let combination of this.combinations) {
      const [a, b, c] = combination;

      if (this.gridSelections[a] && this.gridSelections[a] === this.gridSelections[b] && this.gridSelections[a] === this.gridSelections[c]) {
        return this.gridSelections[a];
      }
    }

    return null;
  }

  private getInitialGameState(): TicTacToeGameState {
    return {
      winner: null,
      gridSelections: Array(9).fill(null),
      nextPlayer: 'X'
    }
  }

  // private printNoSquareSelectedError() {
  //   console.log('no square selected..');
  // }
}
