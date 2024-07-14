import { Component } from '@angular/core';
import { Show, ShowType } from 'src/app/models/models';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent {
  showList: Array<Show> = [];
  isAddShowWindowOpened: boolean = false;
  isDialogWindowOpened: boolean = false;
  isWarned: boolean = false;
  siteToNavigateTo: string | null = null;

  constructor() {
    this.showList = [
      {
        id: 1,
        name: 'Hannibal',
        cover_image_path: 'https://image.tmdb.org/t/p/original/gOkmyEfCSupwAnFKGOj8doGRrtQ.jpg',
        type: ShowType.TV_SHOW,
        rating: 8,
        more_details_redirect: 'https://www.imdb.com/title/tt2243973/'
      },
      {
        id: 2,
        name: 'Interstellar',
        cover_image_path: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themoviedb.org%2Ft%2Fp%2Foriginal%2FnCbkOyOMTEwlEV0LtCOvCnwEONA.jpg&f=1&nofb=1&ipt=0c48e7953549b4f7ee0de587c14c8e9da93818c7d59dc501851445f06d38b2d6&ipo=images',
        type: ShowType.MOVIE,
        rating: 9,
        more_details_redirect: ''
      },
      {
        id: 3,
        name: 'Bojack Horseman',
        cover_image_path: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ%40%40._V1_FMjpg_UX1000_.jpg&f=1&nofb=1&ipt=9deed0d061db766f6f25fcd551c140de42f42c85b90fa092151768b973235806&ipo=images',
        type: ShowType.TV_SHOW,
        rating: 9,
        more_details_redirect: 'https://www.imdb.com/title/tt3398228/'
      }];
  }

  navigateTo(url: string | null) {
    if (!this.isWarned) {
      this.siteToNavigateTo = url;
      this.isWarned = true;
      this.isDialogWindowOpened = true;
    }
    else {
      this.isDialogWindowOpened = false;
      this.siteToNavigateTo = url != null && url !== '' ? url : this.siteToNavigateTo;
      window.open(this.siteToNavigateTo!, '_blank');
      this.siteToNavigateTo = null;
    }
  }

  toggleAddShowWindow: () => void = () => {
    this.isAddShowWindowOpened = !this.isAddShowWindowOpened
  }

  addShow() {
    throw new Error('Method not implemented.');
  }
}
