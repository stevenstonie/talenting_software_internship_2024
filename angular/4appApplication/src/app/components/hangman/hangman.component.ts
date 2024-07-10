import { Component } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent {
  words: string[] = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'peach', 'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon', 'zucchini', 'acorn', 'birch', 'cedar', 'dogwood', 'elm', 'fir', 'hawthorn', 'ivy', 'juniper', 'maple', 'oak', 'pine', 'quaking', 'redwood', 'spruce', 'tulip', 'willow', 'yucca', 'zinnia', 'anemone', 'begonia', 'camellia', 'dahlia', 'echinacea', 'foxglove', 'gardenia', 'hibiscus', 'iris', 'jasmine'];
  selectedWord: string | null = null;
  rightGuesses: string[] = [];
  wrongGuesses: string[] = [];
  maxIncorrectGuesses: number = 6;


  startGame() {
    this.selectedWord = this.words[Math.floor(Math.random() * this.words.length)];

    this.rightGuesses = [];
    this.wrongGuesses = [];
  }

  guessLetter(letter: string) {
    console.log(this.wrongGuesses.join(", "));
    letter = letter.toLowerCase();

    if (this.selectedWord?.indexOf(letter) === -1) {
      this.wrongGuesses.push(letter);
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

  wordToDisplayOnScreen() : string {
    let wordToDisplay = '';

    for (let i = 0; i < this.selectedWord?.length!; i++) {
      if (this.rightGuesses.includes(this.selectedWord![i])) {
        wordToDisplay += this.selectedWord![i];
      } else {
        wordToDisplay += '_';
      }
    }

    return wordToDisplay;
  }

  exitGame() {
    this.selectedWord = null;
  }
}
