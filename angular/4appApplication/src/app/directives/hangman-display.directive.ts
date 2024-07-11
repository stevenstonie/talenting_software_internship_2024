import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHangmanDisplay]'
})
export class HangmanDisplayDirective implements OnChanges {
  @Input() wrongGuesses: number = 0;
  private bodyPartNames: string[] = [
    'head.png',
    'torso.png',
    'left_arm.png',
    'right_arm.png',
    'left_leg.png',
    'right_leg.png'
  ];
  bodyParts = this.elemRef.nativeElement.querySelectorAll('.body-part');

  constructor(private elemRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    this.updateHangmanDisplay();
  }

  private updateHangmanDisplay() {
    if (this.wrongGuesses > 0 && this.wrongGuesses <= this.bodyParts.length) {
      const currentPart = this.bodyParts[this.wrongGuesses - 1];

      const currentPartDisplay = window.getComputedStyle(currentPart).display;
      if (currentPartDisplay === 'none') {
        this.renderer.setStyle(currentPart, 'display', 'block');
      }
    }
  }

}
