import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHangmanDisplay]'
})
export class HangmanDisplayDirective implements OnChanges, AfterViewInit {
  @Input() wrongGuesses: number = 0;
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
      }
    }
  }

}
