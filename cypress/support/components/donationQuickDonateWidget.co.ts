import { clearInput, clickElement, elementByClass, enterText, setFocus } from "../utils/actions";

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
    this.container = elementByClass('.quick-donate-widget-container');

    this.frequency = this.container.$('.donate-widget-type');
    this.selectedFrequency = this.frequency.$('input[checked="checked"]');
    this.frequencyOneTimeLabel = this.frequency.$('.btn-primary[for="it_1"]');
    this.frequencyMonthlyLabel = this.frequency.$('.btn-primary[for="it_4"]');
    this.amount = this.container.$('.donate-widget-amount input');
    this.donateButton = this.container.$('.donate-widget-button');
  }

  /**
   * Verifies that the widget has been populated with the default donations values for frequency and amount
   * @param defaultValues - the values expected to be selected by default
   */
  verifyDefaultValues(defaultValues) {
    expect(this.selectedFrequency.getAttribute('value')).eq(defaultValues.frequency);
    expect(this.amount.getAttribute('value')).eq(defaultValues.amount);
  }

  /**
   * Populates the widget with given frequency and amount
   * @param values - the frequency and amount value to be set in the widget
   */
  populateFrequencyAndAmount(values) {
    switch (values.frequency) {
      case "1":
        clickElement(this.frequencyOneTimeLabel);
        break;
      case "4":
        clickElement(this.frequencyMonthlyLabel);
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