import { clearInput, clearInputWithBackspace, clickElement, elementByClass, elementById, elementsByClass, enterText, pressEsc, selectAutoCompleteDropDownOption } from "../utils/actions";

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
    this.container = elementByClass('.fund-list-container');
    this.fundInput = elementByClass('.fund-selection-input');
    this.autocomplete = elementByClass('.cdk-overlay-container');
    this.divider = elementByClass(this.autocomplete, '.fund-list-divider');
    this.options = elementsByClass(this.autocomplete, '.fund-list-option');
    this.shortlistOptions = elementsByClass(this.autocomplete, '.fund-list-option.fund-shortlist');
    this.error = elementByClass(this.container, '.error-message strong');
    this.fundName = elementByClass(this.container, '#other-fund-name');
    this.otherFundNameError = elementByClass(this.container, '.error-message strong');
  }

  getFundValue() {
    return this.fundInput.getAttribute('value');
  }

  clearSelection() {
    this.getFundValue().then(value => {
      clearInputWithBackspace(this.fundInput, value?.length);
    });
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
