import { buildSelector, clearInput, clickElement, enterText, setFocus } from "../utils/actions";

/**
 * Represents the Quick Donate widget
 */
export class DonationQuickDonateWidget {
  container: any;
  frequency: any;
  selectedFrequency: any;
  frequencyOneTimeLabel: any;
  frequencyMonthlyLabel: any;
  amount: any;
  donateButton: any;

  constructor() {
    this.container = buildSelector('.quick-donate-widget-container');

    this.frequency = buildSelector(this.container, '.donate-widget-type');
    this.selectedFrequency = buildSelector(this.frequency, 'input[checked="checked"]');
    this.frequencyOneTimeLabel = buildSelector(this.frequency, '.btn-primary[for="it_1"]');
    this.frequencyMonthlyLabel = buildSelector(this.frequency, '.btn-primary[for="it_4"]');
    this.amount = buildSelector(this.container, '.donate-widget-amount input');
    this.donateButton = buildSelector(this.container, '.donate-widget-button');
  }

  /**
   * Verifies that the widget has been populated with the default donations values for frequency and amount
   * @param defaultValues - the values expected to be selected by default
   */
  verifyDefaultValues(defaultValues) {
    cy.get(this.selectedFrequency).invoke('attr', 'value').should('eq',defaultValues.frequency);
    cy.get(this.amount).invoke('attr', 'value').should('eq',defaultValues.amount);
  }

  /**
   * Populates the widget with given frequency and amount
   * @param values - the frequency and amount value to be set in the widget
   */
  populateFrequencyAndAmount(values) {
    switch (values.frequency) {
      case "1":
        cy.get(this.frequencyOneTimeLabel).click();
        break;
      case "4":
        cy.get(this.frequencyMonthlyLabel).click();
        break;
      default:
        break;
    }
    if (values.amount) {
      clearInput(this.amount);
      enterText(this.amount, values.amount);
    }
  }

  clickDonate() {
    setFocus(this.donateButton);
    return clickElement(this.donateButton);
  }
}