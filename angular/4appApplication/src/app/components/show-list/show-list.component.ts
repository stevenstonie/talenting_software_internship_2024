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
        cover_image_path: 'assets/shows/show_images/hannibal-cover.jpg',
        name: 'Hannibal',
        type: ShowType.TV_SHOW,
        rating: 8
      },
      {
        id: 2,
        cover_image_path: 'assets/shows/show_images/interstellar-cover.jpg',
        name: 'Interstellar',
        type: ShowType.MOVIE,
        rating: 9
      },
      {
        id: 3,
        cover_image_path: 'assets/shows/show_images/bojack-horseman-cover.jpg',
        name: 'Bojack Horseman',
        type: ShowType.TV_SHOW,
        rating: 9
      }];
  }
}
