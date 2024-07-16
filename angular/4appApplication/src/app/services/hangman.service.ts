import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HangmanGameState } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {
  private words: string[] = [
    'apple', 'banana', 'beach', 'cherry', 'clown', 'date', 'fig', 'flower',
    'grape', 'guitar', 'honeydew', 'island', 'jungle', 'kitten', 'lemon',
    'lemon', 'mango', 'monkey', 'oak', 'orange', 'peach', 'raspberry',
    'tangerine', 'watermelon'
  ];
  private selectedWord: string | null = null;
  private rightGuesses: string[] = [];
  private wrongGuesses: string[] = [];
  private maxIncorrectGuesses: number = 6;

  private gameStateSubject = new BehaviorSubject<HangmanGameState>(this.getInitialGameState());
  gameState$ = this.gameStateSubject.asObservable();

  constructor() {
  }

  startNewGame() {
    this.selectedWord = this.words[Math.floor(Math.random() * this.words.length)];

    this.rightGuesses = [];
    this.wrongGuesses = [];

    this.updateGameState();
  }

  exitGame() {
    this.gameStateSubject.next({
      selectedWord: null,
      rightGuesses: [],
      wrongGuesses: [],
      incorrectGuesses: 0,
      maxIncorrectGuesses: this.maxIncorrectGuesses,
      gameWon: false,
      gameLost: false,
    });
  }

  guessLetter(letter: string) {
    if (!this.selectedWord) {
      this.printSelectedWordIsNullError();
      return;
    }

    letter = letter.toLowerCase();

    if (this.rightGuesses.includes(letter) || this.wrongGuesses.includes(letter)) {
      return;
    }

    if (this.selectedWord.includes(letter)) {
      this.rightGuesses.push(letter);
    } else {
      this.wrongGuesses.push(letter);
    }

    this.updateGameState();
  }

  getMaxIncorrectGuesses(): number {
    return this.maxIncorrectGuesses;
  }

  private getInitialGameState(): HangmanGameState {
    return {
      selectedWord: this.selectedWord,
      rightGuesses: this.rightGuesses,
      wrongGuesses: this.wrongGuesses,
      incorrectGuesses: this.wrongGuesses.length,
      maxIncorrectGuesses: this.maxIncorrectGuesses,
      gameWon: false,
      gameLost: false,
    };
  }

  private updateGameState() {
    if (!this.selectedWord) {
      this.printSelectedWordIsNullError();
      return;
    }

    this.gameStateSubject.next({
      selectedWord: this.selectedWord,
      rightGuesses: this.rightGuesses,
      wrongGuesses: this.wrongGuesses,
      incorrectGuesses: this.wrongGuesses.length,
      maxIncorrectGuesses: this.maxIncorrectGuesses,
      gameWon: this.isGameWon(),
      gameLost: this.isGameLost(),
    })
  }

  private isGameWon(): boolean {
    if (!this.selectedWord) {
      this.printSelectedWordIsNullError();
      return false;
    }

    return this.selectedWord.split('')
      .every(letter => this.rightGuesses.includes(letter));
  }

  private isGameLost(): boolean {
    return this.wrongGuesses.length >= this.maxIncorrectGuesses;
  }

  private printSelectedWordIsNullError(): void {
    console.error('selectedWord is null!!!');
  }
}
