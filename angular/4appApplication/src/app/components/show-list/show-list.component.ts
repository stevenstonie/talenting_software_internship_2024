import { Component, Renderer2 } from '@angular/core';
import { Show, ShowType } from 'src/app/models/models';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent {
  storageNameForRatedShowsIds = 'ratedShowsIds';
  showList: Array<Show> = [];
  siteToNavigateTo: string | null = null;
  showToAdd: Show = this.setShowCredentialsToDefault();
  showToRate: Show = this.setShowCredentialsToDefault();
  ratingChosen: number = 1;
  showTypes: ShowType[] = Object.values(ShowType);
  booleans = {
    isAddShowWindowOpened: false,
    isRateShowWindowOpened: false,
    isDialogWindowOpened: false,
    isWarned: false
  }

  constructor(private renderer: Renderer2) {
    this.showList = this.getShowsFromStorage();
  }

  navigateTo(url: string | null) {
    this.siteToNavigateTo = url != null && url !== '' ? url : this.siteToNavigateTo;
    if (!this.booleans.isWarned) {
      this.booleans.isWarned = true;
      this.booleans.isDialogWindowOpened = true;
    }
    else {
      this.booleans.isDialogWindowOpened = false;
      window.open(this.siteToNavigateTo!, '_blank');
      this.siteToNavigateTo = null;
    }
  }

  toggleAddShowWindow: () => void = () => {
    this.booleans.isAddShowWindowOpened = !this.booleans.isAddShowWindowOpened
  }

  addShow() {
    this.addShowToStorage();

    this.showToAdd = this.setShowCredentialsToDefault();
  }

  addShowToStorage() {
    if (this.showToAdd.rating < 1 || this.showToAdd.rating > 10) {
      this.showToAdd.rating = 0;
    }
    if (this.showToAdd.rating >= 1) {
      this.showToAdd.numberOfTotalRatings = Math.floor(Math.random() * 100) + 1;
    }
    this.showToAdd.id = this.getNextIdAvailableForShow();

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

  getNextIdAvailableForShow() {
    let showIds = this.showList.map(show => show.id);

    showIds.sort((a, b) => a - b);

    let nextId = 1;
    for (const id of showIds) {
      if (id === nextId) {
        nextId = id + 1;
      } else if (id > nextId) {
        break;
      }
    }

    return nextId;
  }

  rateShow() {
    if (!this.ratingChosen && this.ratingChosen < 1 || this.ratingChosen > 10) {
      alert('invalid rating..');
      return;
    }

    const ratedShowsIds = this.getRatedShowsIdsFromLocalStorage();

    for (const ratedShowId of ratedShowsIds) {
      if (ratedShowId === this.showToRate.id) {
        alert('you have already rated this show.');
        return;
      }
    }

    const averageRateOfShowToRate = this.showToRate.rating;
    const nbOfRatingsOfShowToRate = this.showToRate.numberOfTotalRatings;

    const newRating = (averageRateOfShowToRate * nbOfRatingsOfShowToRate + this.ratingChosen) / (nbOfRatingsOfShowToRate + 1);

    this.showToRate.rating = newRating;
    this.showToRate.numberOfTotalRatings += 1;

    this.saveShowsToStorage(this.showList);

    ratedShowsIds.push(this.showToRate.id);
    localStorage.setItem(this.storageNameForRatedShowsIds, JSON.stringify(ratedShowsIds));
  }

  toggleRateShowWindow(show: Show, event: Event) {
    this.booleans.isRateShowWindowOpened = !this.booleans.isRateShowWindowOpened;

    if (this.booleans.isRateShowWindowOpened) {
      this.showToRate = show;
    } else {
      this.showToRate = this.setShowCredentialsToDefault();
    }

    const rateShowWindow = document.getElementById('rate-show-window');

    if (rateShowWindow) {
      this.positionRateShowWindow(event, rateShowWindow);
    }
  }

  positionRateShowWindow(event: Event, rateShowWindow: HTMLElement) {
    const posOfClickedElem = (event.currentTarget as HTMLElement).getBoundingClientRect();

    if (posOfClickedElem.top < window.innerHeight / 4) {
      console.log('above middle')
      this.renderer.setStyle(rateShowWindow, 'top', `${window.scrollY}px`);
    } else {
      console.log('below middle')
      this.renderer.setStyle(rateShowWindow, 'top', `${posOfClickedElem.top + window.scrollY - rateShowWindow.offsetHeight}px`);
    }

    if (posOfClickedElem.left < window.innerWidth / 2) {
      console.log('left of middle')
      this.renderer.setStyle(rateShowWindow, 'left', `${posOfClickedElem.left + window.scrollX}px`);
      this.renderer.setStyle(rateShowWindow, 'transform', `translate(120px, 0)`);
    } else {
      console.log('right of middle')
      this.renderer.setStyle(rateShowWindow, 'left', `${posOfClickedElem.left + window.scrollX}px`);
      this.renderer.setStyle(rateShowWindow, 'transform', `translate(${-rateShowWindow.offsetWidth - 80}px, 0)`);
    }
  }

  removeShow(show: Show) {
    const index = this.showList.indexOf(show);
    this.showList.splice(index, 1);
    this.saveShowsToStorage(this.showList);

    this.removeRatedShowIdFromLocalStorage(show.id);
  }

  getRatedShowsIdsFromLocalStorage() {
    const ratedShowsIdsJson = localStorage.getItem(this.storageNameForRatedShowsIds);
    const ratedShowsIds = ratedShowsIdsJson ? JSON.parse(ratedShowsIdsJson) : [];
    return ratedShowsIds;
  }

  removeRatedShowIdFromLocalStorage(showId: number) {
    const ratedShowsIds = this.getRatedShowsIdsFromLocalStorage();
    const index = ratedShowsIds.indexOf(showId);
    if (index > -1) {
      ratedShowsIds.splice(index, 1);
      localStorage.setItem(this.storageNameForRatedShowsIds, JSON.stringify(ratedShowsIds));
    }
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