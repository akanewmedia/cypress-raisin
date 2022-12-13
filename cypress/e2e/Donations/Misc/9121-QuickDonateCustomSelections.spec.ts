import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { DonationsHomePage } from "../../../support/pages/Donations/home.po";
import * as specificData from '../../../data/Donations/QuickDonateCustomSelections.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();
const homePO = new DonationsHomePage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(9121) Donations > Homepage > Quick Donate > Custom Selections > Complete Flow : ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                pageSetup.waitForPageLoad()
            });

            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });

            it("home page with widget should be loaded", () => {
                donationsPO.waitForDonationsHomeWidgetToBeLoaded()
            });

            it('should verify the default values on Quick Donate widget', () => {
                homePO.verifyWidgetDefaultValues(data.widgetDefaults);
            });

            it('should change frequency and amount values on Quick Donate widget and click Donate to load the donation flow', () => {
                homePO.populateWidget(data.widgetData);
                homePO.clickDonateWidget();
            });

            it("donations start page should be loaded", () => {
                cy.wait(3000);
                donationsPO.waitForDonationsContainerToBeLoaded()
            });

            it('should check the values coming from the widget populated in the first step "Choose Your Donation" and go to next step', () => {
                donationsPO.donationDetails.verifySelectedDonationFrequency(data.selectedFrequencyFromWidget);
                donationsPO.donationDetails.verifySelectedDonationMatrixAmount(data.selectedAmountFromWidget);
                donationsPO.continue();
                donationsPO.isStepDisplayed(1)
            });

            it('should populate the profile and payment required fields and complete the donation', () => {
                donationsPO.donorInformation.populateMinimumFields(data);
                donationsPO.paymentInformation.populateAllFields(data.card);
                donationsPO.stepper.clickDonate();
                // donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
