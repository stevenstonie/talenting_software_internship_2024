import { Component, Renderer2 } from '@angular/core';
import { Show, ShowType } from 'src/app/models/models';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent {
  showList: Array<Show> = [];
  isAddShowWindowOpened: boolean = false;
  isRateShowWindowOpened: boolean = false;
  isDialogWindowOpened: boolean = false;
  isWarned: boolean = false;
  siteToNavigateTo: string | null = null;
  showToAdd: Show = this.setShowCredentialsToDefault();
  showToRate: Show = this.setShowCredentialsToDefault();
  showTypes: ShowType[] = Object.values(ShowType);

  constructor(private renderer: Renderer2) {
    this.showList = this.getShowsFromStorage();
  }

  navigateTo(url: string | null) {
    this.siteToNavigateTo = url != null && url !== '' ? url : this.siteToNavigateTo;
    if (!this.isWarned) {
      this.isWarned = true;
      this.isDialogWindowOpened = true;
    }
    else {
      this.isDialogWindowOpened = false;
      window.open(this.siteToNavigateTo!, '_blank');
      this.siteToNavigateTo = null;
    }
  }

  toggleAddShowWindow: () => void = () => {
    this.isAddShowWindowOpened = !this.isAddShowWindowOpened
  }

  addShow() {
    this.addShowToStorage();

    this.showToAdd = this.setShowCredentialsToDefault();
  }

  addShowToStorage() {
    if (this.showToAdd.rating >= 1) {
      this.showToAdd.numberOfTotalRatings = Math.floor(Math.random() * 100) + 1;
    }

    this.showList.unshift(this.showToAdd);

    this.saveShowsToStorage(this.showList);
  }

  getShowsFromStorage(): Show[] {
    const jsonShowData = localStorage.getItem('shows');
    return jsonShowData ? JSON.parse(jsonShowData) : [];
  }

  saveShowsToStorage(shows: Show[]) {
    const jsonShowData = JSON.stringify(shows);
    localStorage.setItem('shows', jsonShowData);
  }

  toggleRateShowWindow(show: Show, event: Event) {
    this.isRateShowWindowOpened = !this.isRateShowWindowOpened;

    if (this.isRateShowWindowOpened) {
      this.showToRate = show;
    } else {
      this.showToRate = this.setShowCredentialsToDefault();
    }

    const rateShowWindow = document.getElementById('rate-show-window');

    if (rateShowWindow) {
      const posOfClickedElem = (event.currentTarget as HTMLElement).getBoundingClientRect();

      if (posOfClickedElem.top < window.innerHeight / 2) {
        console.log('above middle')
        this.renderer.setStyle(rateShowWindow, 'top', `${window.scrollY}px`);
      } else {
        console.log('below middle')
        this.renderer.setStyle(rateShowWindow, 'top', `${posOfClickedElem.top + window.scrollY - rateShowWindow.offsetHeight}px`);
      }

      if (posOfClickedElem.left < window.innerWidth / 2) {
        console.log('left of middle')
        this.renderer.setStyle(rateShowWindow, 'left', `${posOfClickedElem.left + window.scrollX}px`);
        this.renderer.setStyle(rateShowWindow, 'transform', `translate(110px, 0)`);
      } else {
        console.log('right of middle')
        this.renderer.setStyle(rateShowWindow, 'left', `${posOfClickedElem.left + window.scrollX}px`);
        this.renderer.setStyle(rateShowWindow, 'transform', `translate(${-rateShowWindow.offsetWidth - 110}px, 0)`);
      }
    }
  }

  removeShow(show: Show) {
    const index = this.showList.indexOf(show);
    this.showList.splice(index, 1);
    this.saveShowsToStorage(this.showList);
  }

  // -------------------------------------------------

  doNothing() {

  }

  private setShowCredentialsToDefault(): Show {
    return {
      id: 0,
      name: '',
      cover_image_path: null,
      type: null,
      rating: 0,
      numberOfTotalRatings: 0,
      more_details_redirect: null
    }
  }
}