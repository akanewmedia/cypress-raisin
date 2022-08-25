//The information regarding the libraries
import { clickElement, elementByClass, elementById, elementsByClass, enterText } from "../utils/actions";
export class SearchResult {
  container: any;
  name: any;
  location: any;
  button: any;
  constructor(result) {
    this.container = result;
    this.name = elementByClass(this.container, '.search-title');
    this.location = elementByClass(this.container, '.search-group:last-child');
    this.button = elementByClass(this.container, '.pull-right .btn-search-donate');
  }
}

export class Search {
  searchBarContainer: any;
  searchBar: any;
  searchButton: any;
  searchResultsContainer: any;
  searchResults: any;
  individualTab: any;
  teamTab: any;
  groupTab: any;
  eventTab: any;

  constructor(private container: any) {
    this.searchBarContainer = elementByClass(this.container, '.search-form');
    this.searchBar = elementByClass(this.searchBarContainer, '#search-box');
    this.searchButton = elementByClass(this.searchBarContainer, '.btn-flow--light');
    this.searchResultsContainer = elementByClass(this.container, '#search');

    this.individualTab = elementById(this.container, 'search-navigation-individual');
    this.teamTab = elementById(this.container, 'search-navigation-team');
    this.groupTab = elementById(this.container, 'search-navigation-group');
    this.eventTab = elementById(this.container, 'search-navigation-event');
  }

  initContainer() {
    this.searchResults = elementsByClass(this.searchResultsContainer, '.search-result');
  }

  selectSearchResult(index) {
    this.initContainer();
    const searchResult = new SearchResult(this.searchResults.get(index));
    clickElement(searchResult.button, true);
  }

  search(text) {
    enterText(this.searchBar, text);
    clickElement(this.searchButton);
  }


  searchAndSelect(text, index = 0) {
    this.search(text);
    this.initContainer()
    this.selectSearchResult(index);
  }

  searchAndNavigateFirstOption(text) {
    this.search(text);
    this.initContainer();
    const searchResult = new SearchResult(this.searchResults.get(0));
    searchResult.name.$$('a').first().click();
  }
}
