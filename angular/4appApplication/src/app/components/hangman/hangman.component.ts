import { Component } from '@angular/core';
import { HangmanPipe } from 'src/app/pipes/hangman.pipe';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent {
  words: string[] = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'honeydew', 'lemon', 'mango', 'orange', 'peach', 'raspberry', 'tangerine', 'watermelon', 'oak'];
  selectedWord: string | null = null;
  rightGuesses: string[] = [];
  wrongGuesses: string[] = [];
  maxIncorrectGuesses: number = 6;
  private _hangmanPipe: HangmanPipe = new HangmanPipe();

  constructor() { }

  startGame() {
    this.selectedWord = this.words[Math.floor(Math.random() * this.words.length)];

    this.rightGuesses = [];
    this.wrongGuesses = [];
  }

  guessLetter(letter: string) {
    letter = letter.toLowerCase();

    if (this.selectedWord?.indexOf(letter) === -1) {
      if (!this.wrongGuesses.includes(letter)) {
        this.wrongGuesses.push(letter);
      }
      if (this.wrongGuesses.length >= this.maxIncorrectGuesses) {
        alert('GAME OVER! YOUUUU LOSEEEE!... the word was ' + this.selectedWord);
        this.exitGame();
      }
    } else {
      if (!this.rightGuesses.includes(letter)) {
        this.rightGuesses.push(letter);
      }
      if (this.rightGuesses.length === this.selectedWord?.length) {
        alert('Winner winner!!!!! bazinga... the word was ' + this.selectedWord);
        this.exitGame();
      }
    }
  }

  get wordToDisplay(): string {
    return this._hangmanPipe.transform(this.selectedWord, this.rightGuesses);
  }

  exitGame() {
    this.selectedWord = null;
  }
}
