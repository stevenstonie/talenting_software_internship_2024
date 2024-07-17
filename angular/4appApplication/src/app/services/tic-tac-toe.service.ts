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
  private playsVsComputer: boolean = false;
  private selectedCharacter: ('X' | 'O' | null) = null;
  private winCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  private xSoundEffect = new Audio('assets/tic-tac-toe/X sound effect.mp3');
  private oSoundEffect = new Audio('assets/tic-tac-toe/O sound effect.mp3');
  private winSoundEffect = new Audio('assets/tic-tac-toe/win sound effect.mp3');

  constructor() { }

  makeMove(index: number, player: 'X' | 'O') {
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

  startNewGame(selectedCharacter: ('X' | 'O' | null), playsVsComputer: boolean) {
    this.selectedCharacter = selectedCharacter;
    this.playsVsComputer = playsVsComputer;
    this.nextPlayer = 'X';
    this.gridSelections = Array(9).fill(null);
    this.winner = null;
    this.winningSquares = [];

    this.updateGameState();
  }

  private updateGameState() {
    this.gameStateSubject.next({
      winner: this.checkForWinner(false),
      gridSelections: this.gridSelections,
      nextPlayer: this.nextPlayer,
      winningSquares: this.winningSquares
    });

    if (this.playsVsComputer && this.nextPlayer !== this.selectedCharacter) {
      setTimeout(() => {
        const computerCharacter = this.selectedCharacter === 'X' ? 'O' : 'X';
        let bestMove = this.getBestMove();

        if (bestMove === undefined) {
          console.error('getBestMove() returned undefined.')
          return;
        }

        this.makeMove(bestMove, computerCharacter);
      }, 800);
    }
  }

  private checkForWinner(isAnalizing: boolean): TicTacToeGameState['winner'] {
    for (let combination of this.winCombinations) {
      const [a, b, c] = combination;

      if (this.gridSelections[a] && this.gridSelections[a] === this.gridSelections[b] && this.gridSelections[a] === this.gridSelections[c]) {
        if (!isAnalizing) {
          this.winSoundEffect.play();
        }

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

  // minimax ----------------------------------------------------------------

  private getBestMove(): number | undefined {
    const computerCharacter = this.selectedCharacter === 'X' ? 'O' : 'X';

    const bestMove = this.minimax(this.gridSelections, computerCharacter);

    return bestMove?.index;
  }

  private minimax(board: TicTacToeGameState['gridSelections'], currentPlayer: TicTacToeGameState['nextPlayer']): { index: number, score: number } | null {
    const winner = this.checkForWinner(true);
    const computerCharacter = this.selectedCharacter === 'X' ? 'O' : 'X';

    if (winner === 'X') return { score: computerCharacter === 'X' ? 1 : -1, index: -1 };
    if (winner === 'O') return { score: computerCharacter === 'O' ? 1 : -1, index: -1 };
    if (winner === 'DRAW') return { score: 0, index: -1 };

    const availableMoves = this.getAvailableMoves(board);

    const movesAndScores = this.evaluateMoves(board, currentPlayer, availableMoves);

    if (movesAndScores === null) {
      console.error('evaluateMoves() returned null.');
      return null;
    }

    return this.returnBestMove(movesAndScores, currentPlayer);
  }

  private returnBestMove(moves: { index: number, score: number }[], currentPlayer: TicTacToeGameState['nextPlayer']) {
    let bestMove = null;

    if (currentPlayer === 'X') {
      let bestScore = -Infinity;
      for (const move of moves) {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    } else {
      let bestScore = Infinity;
      for (const move of moves) {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    }

    return bestMove;
  }

  private evaluateMoves(board: TicTacToeGameState['gridSelections'], currentPlayer: TicTacToeGameState['nextPlayer'], availableMoves: number[]): { index: number, score: number }[] | null {
    let moves = [];

    for (const availableMove of availableMoves) {
      const move = {
        index: availableMove,
        score: 0
      };

      board[availableMove] = currentPlayer;

      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      let result = this.minimax(board, nextPlayer);
      move.score = result === null ? 0 : result.score;

      board[availableMove] = null;

      moves.push(move);
    }

    return moves;
  }

  private getAvailableMoves(board: TicTacToeGameState['gridSelections']): number[] {
    const moves = [];

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        moves.push(i);
      }
    }

    return moves;
  }
}
