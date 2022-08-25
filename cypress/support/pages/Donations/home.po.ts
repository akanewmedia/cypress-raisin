import { DonationQuickDonateWidget } from '../../components/donationQuickDonateWidget.co';
import { elementByClass } from '../../utils/actions';

/**
 * Representation of the Donations event Home page
 */
export class DonationsHomePage {
  container: any;
  quickDonateWidget: DonationQuickDonateWidget;

  constructor() {
    this.container = elementByClass('.base-page');
    this.quickDonateWidget = new DonationQuickDonateWidget();
  }

  /**
   * Verifies that the widget has been populated with the default donations values for frequency and amount
   * @param values - the values expected to be selected by default
   */
  verifyWidgetDefaultValues(values) {
    this.quickDonateWidget.verifyDefaultValues(values);
  }

  /**
   * Populates the Quick Donate widget with custom values
   * @param values - the frequency and amount value to be set in the widget
   */
  populateWidget(values) {
    this.quickDonateWidget.populateFrequencyAndAmount(values);
  }

  /**
   * Clicks the Donate button of the Quick Donate Widget
   */
  clickDonateWidget() {
    return this.quickDonateWidget.clickDonate();
  }
}
