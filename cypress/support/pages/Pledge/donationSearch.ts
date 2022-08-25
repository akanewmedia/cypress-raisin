import { clickElement, elementByClass } from "../../utils/actions";
import { Search } from '../../components/search.co';
import { DonateAsComponent } from "../../components/donateAsModal.co";

export class DonationSearchPage {
  container: any;
  searchComponent: any;
  donateAsModal: any;

  constructor() {
    this.container = elementByClass('.search-page');
    this.searchComponent = new Search(this.container);
    this.donateAsModal = new DonateAsComponent();
  }

  search(searchValue) {
    this.searchComponent.search(searchValue);
  }

  searchAndSelectFirstOption(searchValue) {
    this.searchComponent.searchAndSelect(searchValue);
  }

  clickTeamButton() {
    clickElement(this.searchComponent.teamTab);
  }

  clickEventTab() {
    clickElement(this.searchComponent.eventTab, true);
  }

  clickGroupTab() {
    clickElement(this.searchComponent.groupTab);
  }

  clickIndividualTab() {
    clickElement(this.searchComponent.individualTab);
  }

  selectDonationResult(index) {
    this.searchComponent.selectSearchResult(index);
  }

  navigateDonationResult(searchValue) {
    this.searchComponent.searchAndNavigateFirstOption(searchValue);
  }
}