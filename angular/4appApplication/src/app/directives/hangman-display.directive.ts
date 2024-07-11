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

  constructor(private elemRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    this.updateHangmanDisplay();
  }

  private updateHangmanDisplay() {
    const parts = this.elemRef.nativeElement.querySelectorAll('.body-part');

    parts.forEach((part: HTMLImageElement, index: number) => {
      if (index < this.wrongGuesses) {
        this.renderer.setStyle(part, 'display', 'block');
        this.renderer.setAttribute(part, 'src', `assets/images/hangman/body_parts/${this.bodyPartNames[index]}`);
      } else {
        this.renderer.setStyle(part, 'display', 'none');
      }
    });
  }
}
