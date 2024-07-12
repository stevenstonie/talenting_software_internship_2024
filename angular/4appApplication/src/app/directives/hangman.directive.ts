import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHangman]'
})
export class HangmanDirective implements OnChanges, AfterViewInit {
  @Input() wrongGuesses: number = 0;
  @Input() letterInputElem!: HTMLInputElement;

  private bodyPartNames: string[] = [
    'head.png',
    'torso.png',
    'left_arm.png',
    'right_arm.png',
    'left_leg.png',
    'right_leg.png'
  ];
  bodyParts: HTMLImageElement[] | null = null;

  constructor(private elemRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.bodyParts = this.elemRef.nativeElement.querySelectorAll('.body-part')
  }

  ngOnChanges(): void {
    this.updateHangmanDisplay();
  }

  private updateHangmanDisplay() {
    if (this.bodyParts == null) return;

    if (this.wrongGuesses > 0 && this.wrongGuesses <= this.bodyParts.length) {
      const currentPart = this.bodyParts[this.wrongGuesses - 1];

      const currentPartDisplay = window.getComputedStyle(currentPart).display;
      if (currentPartDisplay.includes('none')) {
        this.renderer.setStyle(currentPart, 'display', 'block');

        this.flashRed();
      }
    }
  }

  private flashRed() {
    if (!this.letterInputElem) return;

    this.renderer.addClass(this.letterInputElem, 'flash-red');

    const computedStyle = window.getComputedStyle(this.letterInputElem);
    const animationDuration = computedStyle.getPropertyValue('animation-duration');
    const durationInMs = this.parseDurationToMs(animationDuration) - 50;

    setTimeout(() => {
      this.renderer.removeClass(this.letterInputElem, 'flash-red');
    }, durationInMs);
  }

  private parseDurationToMs(duration: string): number {
    const match = RegExp(/(\d+(\.\d+)?)s/).exec(duration);
    if (match) {
      return parseFloat(match[1]) * 1000;
    }
    return 0;
  }

}
