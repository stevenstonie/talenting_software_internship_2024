import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameState, HangmanService } from '../../services/hangman.service';
import { Subscription } from 'rxjs';
import { HangmanWordToDisplayPipe } from 'src/app/pipes/hangman-word-to-display.pipe';
import { DialogWindow } from '../dialog-window/dialog-window.component';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit, OnDestroy {
  selectedWord: string | null = null;
  wrongGuesses: string[] = [];
  wordToDisplay: string = '';
  DialogWindow: DialogWindow = {
    title: '',
    message: '',

    isDialogWindowOpened: false
  };

  private gameState$: Subscription = new Subscription();
  private _hangmanPipe: HangmanWordToDisplayPipe = new HangmanWordToDisplayPipe();

  constructor(private hangmanService: HangmanService) { }

  ngOnInit(): void {
    this.gameState$ = this.hangmanService.gameState$.subscribe(state => {
      this.selectedWord = state.selectedWord;
      this.wrongGuesses = state.wrongGuesses;
      this.wordToDisplay = this._hangmanPipe.transform(this.selectedWord, state.rightGuesses);

      if (state.gameWon || state.gameLost) {
        this.populateDialogWindow(state);
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
    this.DialogWindow.isDialogWindowOpened = false;

    this.hangmanService.exitGame();
  }

  populateDialogWindow(state: GameState) {
    this.DialogWindow.isDialogWindowOpened = true;

    if (state.gameWon) {

      if (state.incorrectGuesses === 0) {
        this.DialogWindow.title = 'Perfect score';
        this.DialogWindow.message = 'woah nice. you did it with 0 mistakes.. the word was ' + this.selectedWord;
      } else {
        this.DialogWindow.title = 'Winner';
        this.DialogWindow.message = 'bazinga... the word was ' + this.selectedWord;
      }
    }

    if (state.gameLost) {
      this.DialogWindow.title = 'you lost..';
      this.DialogWindow.message = 'the word was ' + this.selectedWord + '. better luck next time';
    }
  }

  ngOnDestroy(): void {
    this.gameState$.unsubscribe();
  }
}
