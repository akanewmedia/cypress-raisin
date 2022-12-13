import { buildSelector, clearInput, clearInputWithBackspace, clickElement, elementsByClass, enterText, pressEsc, selectAutoCompleteDropDownOption } from "../utils/actions";

/**
 * Represents the fund list component
 */
export class FundListComponent {

  container: any;
  fundInput: any;
  autocomplete: any;
  divider: any;
  options: any;
  shortlistOptions: any;
  error: any;
  fundName: any;
  otherFundNameError: any;
  constructor() {
    this.container = buildSelector('.fund-list-container');
    this.fundInput = buildSelector('.fund-selection-input');
    this.autocomplete = buildSelector('.cdk-overlay-container');
    this.divider = buildSelector(this.autocomplete, '.fund-list-divider');
    this.options = elementsByClass(this.autocomplete, '.fund-list-option');
    this.shortlistOptions = buildSelector(this.autocomplete, '.fund-list-option.fund-shortlist');
    this.error = buildSelector(this.container, '#mat-error-0 > .error-message');
    this.fundName = buildSelector(this.container, '#other-fund-name');
    this.otherFundNameError = buildSelector(this.container, '.error-message strong');
  }

  getFundValue(data) {
    cy.get(this.fundInput).invoke('val').should('eq', data)
    //return this.fundInput.getAttribute('value');
  }

  clearSelection() {
    cy.get(this.fundInput).clear()
  }



  search(fundName) {
    this.openFund();
    this.clearSelection();
    return enterText(this.fundInput, fundName);
  }

  async openFund() {
    return clickElement(this.fundInput);
  }

  clickFund(fundName) {
    return selectAutoCompleteDropDownOption(this.fundInput, fundName);
    // this.autocomplete.element(by.cssContainingText('.fund-list-option', fundName)).click();
  }
  enterOtherFundName(otherFundName) {
    enterText(this.fundName, otherFundName);
  }

  selectFund(fundName) {
    this.search(fundName);
    this.clickFund(fundName);
    this.closeFund();
  }

  /**
   * Closing auto-complete by pressing Escape
   *
   * @memberof FundListComponent
   */
  closeFund() {
    pressEsc();
  }
}
