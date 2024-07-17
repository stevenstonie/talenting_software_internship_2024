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
  selectedCharacter: ('X' | 'O') = 'X';

  currentPlayer: TicTacToeGameState['nextPlayer'] = 'X';
  winner: TicTacToeGameState['winner'] = null;
  hoveredSquare: number | null = null;
  gridSelections: TicTacToeGameState['gridSelections'] = Array(9).fill(null);
  winningLinePosition: { x1: string, y1: string, x2: string, y2: string } = { x1: '0', y1: '0', x2: '0', y2: '0' };

  private gameState: Subscription = new Subscription();

  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit(): void {
    this.gameState = this.ticTacToeService.gameState.subscribe(state => {
      this.currentPlayer = state.nextPlayer;
      this.gridSelections = state.gridSelections;
      this.winner = state.winner;

      if (this.winner !== null && this.winner !== 'DRAW') {
        this.winningLinePosition = this.getWinningLinePosition(state.winningSquares);
      }
    })
  }

  mouseHovering(index: number) {
    if (this.playsVsComputer && this.currentPlayer !== this.selectedCharacter) {
      return;
    }

    if (this.winner === null) {
      this.hoveredSquare = index;
    }
  }

  mouseNotHovering() {
    this.hoveredSquare = null;
  }

  selectSquare(index: number) {
    if (this.playsVsComputer && this.currentPlayer !== this.selectedCharacter) {
      return;
    }

    if (this.gridSelections[index] === null && this.winner === null) {
      this.ticTacToeService.makeMove(index, this.currentPlayer);
    }
  }

  getWinningLinePosition(winningSquares: TicTacToeGameState['winningSquares']): { x1: string, y1: string, x2: string, y2: string } {
    const positions = [
      { x: '15%', y: '15%' },  // 0
      { x: '50%', y: '15%' },  // 1
      { x: '85%', y: '15%' },  // 2
      { x: '15%', y: '50%' },  // 3
      { x: '50%', y: '50%' },  // 4
      { x: '85%', y: '50%' },  // 5
      { x: '15%', y: '85%' },  // 6
      { x: '50%', y: '85%' },  // 7
      { x: '85%', y: '85%' }   // 8
    ];

    const start = positions[winningSquares[0]];
    const end = positions[winningSquares[2]];

    return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
  }

  startNewGame() {
    this.ticTacToeService.startNewGame(this.selectedCharacter, this.playsVsComputer);

    this.hasGameStarted = true;
  }

  exitGame() {
    this.hasGameStarted = false;
  }

  ngOnDestroy(): void {
    this.gameState.unsubscribe();
  }
}
