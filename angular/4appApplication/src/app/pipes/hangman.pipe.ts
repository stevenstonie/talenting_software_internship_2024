import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hangman'
})
export class HangmanPipe implements PipeTransform {

  transform(initialWord: string | null, lettersToDisplay: string[]): string {
    if (!initialWord) return '';

    let wordToDisplay = '';

    for (const element of initialWord) {
      if (lettersToDisplay.includes(element)) {
        wordToDisplay += element;
      } else {
        wordToDisplay += '_';
      }
    }

    return wordToDisplay;
  }

}
