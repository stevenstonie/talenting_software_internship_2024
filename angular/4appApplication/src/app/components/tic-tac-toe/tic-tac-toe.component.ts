import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicTacToeService } from 'src/app/services/tic-tac-toe.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  hasGameStarted = false;
  playsVsComputer = false;

  currentPlayer: 'X' | 'O' = 'X';
  winner: 'X' | 'O' | null = null;
  hoveredSquare: number | null = null;
  gridSelections: ('X' | 'O' | null)[] = Array(9).fill(null);

  private gameState: Subscription = new Subscription();

  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit(): void {
    this.gameState = this.ticTacToeService.gameState.subscribe(state => {
      this.currentPlayer = state.nextPlayer;
      this.gridSelections = state.gridSelections;
      this.winner = state.winner;
    })

    console.log('TicTacToeComponent initialized and subscribed to TicTacToeService');
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

    console.log("COMPONENT--------------------------------------------------");
    console.log('next player: ' + this.currentPlayer);
    console.log('winner: ' + this.winner);

    this.hasGameStarted = true;
  }

  exitGame() {
    this.ticTacToeService.exitGame();

    this.hasGameStarted = false;
  }

  ngOnDestroy(): void {
    this.gameState.unsubscribe();

    console.log('TicTacToeComponent destroyed and unsubscribed from TicTacToeService');
  }
}
