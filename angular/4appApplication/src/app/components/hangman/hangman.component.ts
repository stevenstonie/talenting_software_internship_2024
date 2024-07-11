import { Component } from '@angular/core';
import { HangmanPipe } from 'src/app/pipes/hangman.pipe';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent {
  words: string[] = [
    'apple', 'banana', 'beach', 'cherry', 'clown', 'date', 'fig', 'flower',
    'grape', 'guitar', 'honeydew', 'island', 'jungle', 'kitten', 'lemon',
    'lemon', 'mango', 'monkey', 'oak', 'orange', 'peach', 'raspberry',
    'tangerine', 'watermelon'
  ];
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
    if (!this.selectedWord) {
      this.printSelectedWordIsNullError();
      return;
    }

    letter = letter.toLowerCase();

    if (this.selectedWord.indexOf(letter) === -1) {
      this.letterIsWrong(letter);
    } else {
      this.letterIsRight(letter);
    }
  }

  letterIsWrong(letter: string) {
    if (!this.wrongGuesses.includes(letter)) {
      this.wrongGuesses.push(letter);
    }
    if (this.wrongGuesses.length >= this.maxIncorrectGuesses) {
      alert('GAME OVER! YOUUUU LOSEEEE!... the word was ' + this.selectedWord);
      this.exitGame();
    }
  }

  letterIsRight(letter: string) {
    if (!this.selectedWord) {
      this.printSelectedWordIsNullError();
      return;
    }

    if (!this.rightGuesses.includes(letter)) {
      this.rightGuesses.push(letter);
    }

    let allLettersGuessed = true;
    for (const element of this.selectedWord) {
      if (!this.rightGuesses.includes(element)) {
        allLettersGuessed = false;
        break;
      }
    }

    if (allLettersGuessed) {
      alert('Winner winner!!!!! bazinga... the word was ' + this.selectedWord);
      this.exitGame();
    }
  }

  get wordToDisplay(): string {
    return this._hangmanPipe.transform(this.selectedWord, this.rightGuesses);
  }

  exitGame() {
    this.selectedWord = null;
  }

  printSelectedWordIsNullError(): void {
    console.error('selectedWord is null!!!');
  }
}
