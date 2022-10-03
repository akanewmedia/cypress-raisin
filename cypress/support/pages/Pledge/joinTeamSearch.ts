import { Search } from '../../components/search.co';
import { buildSelector, elementByClass } from '../../utils/actions';

export class JoinTeamPage {
  container: any;
  searchComponent: Search;
  maxTeamSizeErr: any;
  constructor() {
    this.container = buildSelector('.join-team');
    this.searchComponent = new Search(this.container);
    this.maxTeamSizeErr = buildSelector(this.container, '#templates .alert.alert-danger');
  }

  search(searchValue = '', index = 5) {
    this.searchComponent.searchAndSelect(searchValue, index);
  }

  searchAndNavigateFirstOption(searchValue) {
    this.searchComponent.searchAndNavigateFirstOption(searchValue);
  }
}