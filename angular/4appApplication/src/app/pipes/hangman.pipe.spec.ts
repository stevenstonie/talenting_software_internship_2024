import { HangmanPipe } from './hangman.pipe';

describe('HangmanPipe', () => {
  it('create an instance', () => {
    const pipe = new HangmanPipe();
    expect(pipe).toBeTruthy();
  });
});
