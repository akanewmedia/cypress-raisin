import {buildSelector, clearInput } from '../utils/actions';

export class JoinPanel {
  readonly container: any;
  readonly pageHeader: any;
  readonly searchBox: any;
  readonly joinButton: any;
  readonly rows: any;

  constructor() {
    this.container = ('.join-team-search-container');
    this.pageHeader = buildSelector(this.container,'.join-team__header');
    this.searchBox = buildSelector(this.container,'.join-team .mat-form-field-autofill-control');
    this.joinButton = buildSelector(this.container,'.join-team-btn');
    this.rows = buildSelector(this.container,'.team-list li.ng-star-inserted');
  }

  getTeams(): any {
    cy.get(this.rows)
    // return this.rows;
  }

  async isPresent() {
    cy.get(this.container).should('exist')
    // return this.container.isPresent();
  }

  // async waitForDrawerToClose(timeout: number = 1000): Promise<any> {
  //   return browser.wait(
  //     ExpectedConditions.invisibilityOf(this.container),
  //     timeout
  //   );
  // }

  async isVisible(){
    cy.get(this.container).should('be.visible')
    // return this.container.isDisplayed();
  }

  async getRowNameValue(row: any) {
    cy.get(row + '.team-name-and-captain')
    // return row.$('.team-name-and-captain').getText();
  }

  async enterSearch(input: string): Promise<void> {
    cy.get(this.searchBox).clear().type(input)
    // await clearInput(this.searchBox);
    // return this.searchBox.sendKeys(input);
  }

  async clickJoinTeamButton(row: any): Promise<void> {
    cy.get(row + '.join-team-btn').click()
    // return row.$('.join-team-btn').click();
  }
}
