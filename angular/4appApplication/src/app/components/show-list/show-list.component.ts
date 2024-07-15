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
  showToAdd: Show = this.setShowToAddToDefaultValues();

  constructor() {
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

    this.showToAdd = this.setShowToAddToDefaultValues();
  }

  addShowToStorage() {
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

  removeShow(show: Show) {
    const index = this.showList.indexOf(show);
    this.showList.splice(index, 1);
    this.saveShowsToStorage(this.showList);
  }

  // -------------------------------------------------

  doNothing() {

  }

  private setShowToAddToDefaultValues(): Show {
    return {
      id: 0,
      name: '',
      cover_image_path: null,
      type: null,
      rating: 0,
      more_details_redirect: null
    }
  }
}