import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  navigateTo(url: string) {
    window.open(url, '_blank');
  }
}

// TODO: create a component or smth for the button that returns the user to main-page