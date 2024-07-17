import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogWindow, HangmanGameState } from 'src/app/models/models';
import { HangmanWordToDisplayPipe } from 'src/app/pipes/hangman-word-to-display.pipe';
import { HangmanService } from 'src/app/services/hangman.service';

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
    isOpened: false
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
    this.DialogWindow.isOpened = false;

    this.hangmanService.exitGame();
  }

  populateDialogWindow(state: HangmanGameState) {
    this.DialogWindow.isOpened = true;

    if (state.gameWon) {

      if (state.incorrectGuesses === 0) {
        this.DialogWindow.title = 'Flawless';
        this.DialogWindow.message = 'woah, you did it with 0 mistakes. the word was: ' + this.selectedWord;
      } else {
        this.DialogWindow.title = 'Winner';
        this.DialogWindow.message = 'bazinga. the word was: ' + this.selectedWord;
      }
    }

    if (state.gameLost) {
      this.DialogWindow.title = 'You lost..';
      this.DialogWindow.message = 'the word was: ' + this.selectedWord + '. better luck next time';
    }
  }

  ngOnDestroy(): void {
    this.gameState$.unsubscribe();
  }
}
