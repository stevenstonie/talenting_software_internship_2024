import { Component, OnDestroy, OnInit } from '@angular/core';
import { HangmanPipe } from 'src/app/pipes/hangman.pipe';
import { HangmanService } from '../../services/hangman.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit, OnDestroy {
  selectedWord: string | null = null;
  wrongGuesses: string[] = [];
  wordToDisplay: string = '';

  private gameState$: Subscription = new Subscription();
  private _hangmanPipe: HangmanPipe = new HangmanPipe();

  constructor(private hangmanService: HangmanService) { }

  ngOnInit(): void {
    this.gameState$ = this.hangmanService.gameState$.subscribe(state => {
      this.selectedWord = state.selectedWord;
      this.wrongGuesses = state.wrongGuesses;
      this.wordToDisplay = this._hangmanPipe.transform(this.selectedWord, state.rightGuesses);

      if (state.gameWon) {
        alert('Winner winner!!!!! bazinga... the word was ' + this.selectedWord);
        this.exitGame();
      }

      if (state.gameLost) {
        alert('GAME OVER! YOUUUU LOSEEEE!... the word was ' + this.selectedWord);
        this.exitGame();
      }
    });
  }

  guessLetter(letter: string) {
    this.hangmanService.guessLetter(letter);
  }

  startNewGame() {
    this.hangmanService.startNewGame();
  }

  getMaxIncorrectGuesses() {
    return this.hangmanService.getMaxIncorrectGuesses();
  }

  exitGame() {
    this.hangmanService.exitGame();
  }

  ngOnDestroy(): void {
    this.gameState$.unsubscribe();
  }
}
