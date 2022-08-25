import { Search } from '../../components/search.co';
import { elementByClass } from '../../utils/actions';

export class JoinTeamPage {
  container: any;
  searchComponent: Search;
  maxTeamSizeErr: any;
  constructor() {
    this.container = elementByClass('.join-team');
    this.searchComponent = new Search(this.container);
    this.maxTeamSizeErr = elementByClass(this.container, '#templates .alert.alert-danger');
  }

  search(searchValue = '', index = 5) {
    this.searchComponent.searchAndSelect(searchValue, index);
  }

  searchAndNavigateFirstOption(searchValue) {
    this.searchComponent.searchAndNavigateFirstOption(searchValue);
  }
}