import { Component, Renderer2 } from '@angular/core';
import { DialogWindow, Show, ShowType } from 'src/app/models/models';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent {
  storageNameForRatedShowsIds = 'ratedShowsIds';
  showList: Array<Show> = [];
  showToAdd: Show = this.setShowCredentialsToDefault();
  showToRate: Show = this.setShowCredentialsToDefault();
  ratingChosen: number = 1;
  showTypes: ShowType[] = Object.values(ShowType);
  booleans = {
    isAddShowWindowOpened: false,
    isRateShowWindowOpened: false,
    isWarnedOnRedirect: false,
    isWarnedOnRemoving: false
  }
  dialogWindow: DialogWindow = {
    title: '',
    message: '',
    isOpened: false
  };

  constructor(private renderer: Renderer2) {
    this.showList = this.getShowsFromStorage();
  }

  navigateTo(url: string | null) {
    if (!this.booleans.isWarnedOnRedirect) {
      this.booleans.isWarnedOnRedirect = true;
      this.openDialogWindow('Careful!', 'this will redirect you to another site.');
      return;
    }
    window.open(url!, '_blank');
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
      this.openDialogWindow('Invalid rating', 'please choose a rating between 1 and 10.');
      return;
    }

    const ratedShowsIds = this.getRatedShowsIdsFromLocalStorage();

    for (const ratedShowId of ratedShowsIds) {
      if (ratedShowId === this.showToRate.id) {
        this.openDialogWindow('Already rated', 'you have already rated this show.');
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
      this.renderer.setStyle(rateShowWindow, 'top', `${window.scrollY}px`);
    } else {
      this.renderer.setStyle(rateShowWindow, 'top', `${posOfClickedElem.top + window.scrollY - rateShowWindow.offsetHeight}px`);
    }

    if (posOfClickedElem.left < window.innerWidth / 2) {
      this.renderer.setStyle(rateShowWindow, 'left', `${posOfClickedElem.left + window.scrollX}px`);
      this.renderer.setStyle(rateShowWindow, 'transform', `translate(130px, 0)`);
    } else {
      this.renderer.setStyle(rateShowWindow, 'left', `${posOfClickedElem.left + window.scrollX}px`);
      this.renderer.setStyle(rateShowWindow, 'transform', `translate(${-rateShowWindow.offsetWidth - 110}px, 0)`);
    }
  }

  removeShow(show: Show) {
    if (!this.booleans.isWarnedOnRemoving) {
      this.openDialogWindow('Careful!', 'this will remove the show from the list.');
      this.booleans.isWarnedOnRemoving = true;
      return;
    }

    const index = this.showList.indexOf(show);
    this.showList.splice(index, 1);
    this.saveShowsToStorage(this.showList);

    this.removeIdOfRatedShowFromLocalStorage(show.id);
  }

  getRatedShowsIdsFromLocalStorage() {
    const ratedShowsIdsJson = localStorage.getItem(this.storageNameForRatedShowsIds);
    const ratedShowsIds = ratedShowsIdsJson ? JSON.parse(ratedShowsIdsJson) : [];
    return ratedShowsIds;
  }

  removeIdOfRatedShowFromLocalStorage(showId: number) {
    const ratedShowsIds = this.getRatedShowsIdsFromLocalStorage();
    const index = ratedShowsIds.indexOf(showId);
    if (index > -1) {
      ratedShowsIds.splice(index, 1);
      localStorage.setItem(this.storageNameForRatedShowsIds, JSON.stringify(ratedShowsIds));
    }
  }

  openDialogWindow(title: string, message: string) {
    this.dialogWindow.title = title;
    this.dialogWindow.message = message;
    this.dialogWindow.isOpened = true;
  }

  closeDialogWindow() {
    this.dialogWindow.isOpened = false;
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