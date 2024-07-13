import { Component } from '@angular/core';
import { Show, ShowType } from 'src/app/models/models';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent {
  showList: Array<Show> = [];

  constructor() {
    this.showList = [
      {
        id: 1,
        background_image_path: 'assets/shows/show_images/hannibal-cover.jpg',
        name: 'Hannibal',
        type: ShowType.TV_SHOW
      },
      {
        id: 2,
        background_image_path: 'assets/shows/show_images/interstellar-cover.jpg',
        name: 'Interstellar',
        type: ShowType.MOVIE
      },
      {
        id: 3,
        background_image_path: 'assets/shows/show_images/bojack-horseman-cover.jpg',
        name: 'Bojack Horseman',
        type: ShowType.TV_SHOW
      }];
  }
}
