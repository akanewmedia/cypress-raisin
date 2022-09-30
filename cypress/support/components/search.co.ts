//The information regarding the libraries
import { buildSelector, clickElement, elementByClass, elementById, elementsByClass, enterText } from "../utils/actions";
export class SearchResult {
  container: any;
  name: any;
  location: any;
  button: any;
  constructor(result) {
    this.container = result;
    this.name = buildSelector(this.container, '.search-title');
    this.location = buildSelector(this.container, '.search-group:last-child');
    this.button = buildSelector(this.container, '.pull-right .btn-search-donate');
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
    this.searchBarContainer = buildSelector(this.container, '.search-form');
    this.searchBar = buildSelector(this.searchBarContainer, '#search-box');
    this.searchButton = buildSelector(this.searchBarContainer, '.btn-flow--light');
    this.searchResultsContainer = buildSelector(this.container, '#search');
    this.searchResults = buildSelector(this.container, '.search-result');
    this.individualTab = buildSelector(this.container, '#search-navigation-individual');
    this.teamTab = buildSelector(this.container, '#search-navigation-team');
    this.groupTab = buildSelector(this.container, '#search-navigation-group');
    this.eventTab = buildSelector(this.container, '#search-navigation-event');
  }

  initContainer() {
    this.searchResults = elementsByClass(this.searchResultsContainer, '.search-result');
  }

  selectSearchResult(index) {
    this.initContainer();
    cy.get(this.searchResults).get('.btn-donate').click();
    //clickElement(searchResult, true);
  }

  search(text) {
    enterText(this.searchBar, text);
    clickElement(this.searchButton);
  }


  searchAndSelect(text, index = 0) {
    this.search(text);
    //this.initContainer()
    this.selectSearchResult(index);
  }

  searchAndNavigateFirstOption(text) {
    this.search(text);
    this.initContainer(); 
    const searchResult = new SearchResult(this.searchResults);
    cy.get(searchResult.name + ' a').click();
    
  }
}

