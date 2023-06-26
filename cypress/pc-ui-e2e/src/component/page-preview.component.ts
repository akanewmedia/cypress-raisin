import { buildSelector, elementByClass } from '../utils/actions';

export class PagePreview {
  readonly container: any;
  readonly pageTitle: any;
  readonly fundraisingWidget: any;
  readonly fundraisingGoal: any;
  readonly myStory: any;
  constructor() {
    // this must be classes in the iframe
    this.container = buildSelector('.preview-wrap .rs-preview');
    this.pageTitle = buildSelector(this.container,'.page-preview-title');
    this.fundraisingWidget = buildSelector(this.container, '.achieved.mat-card');
    this.fundraisingGoal = buildSelector(this.fundraisingWidget, '.achieved__goal' );
    this.myStory = buildSelector(this.container, '.user-content');
  }

  async isPresent() {
    cy.get(this.container).should('exist')
    // return this.container.isPresent();
  }

  async isVisible() {
    cy.get(this.container).should('be.visible')
    // return this.container.isDisplayed();
  }

  async getMyStory() {
    // scrollElemFinderIntoView(this.myStory);
    cy.get(this.myStory);
  }

  async getPageTitle() {
    // scrollElemFinderIntoView(this.pageTitle);
    cy.get(this.pageTitle)
  }
}
