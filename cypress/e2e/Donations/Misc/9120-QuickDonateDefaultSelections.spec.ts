import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { DonationsHomePage } from "../../../support/pages/Donations/home.po";
import * as specificData from '../../../data/Donations/QuickDonateDefaultSelections.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();
const homePO = new DonationsHomePage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(9120) Donations > Homepage > Quick Donate > Default Selections > Complete Flow : ', () => {
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

            it('should verify the values on Quick Donate widget and click Donate to load the donation flow', () => {
                homePO.verifyWidgetDefaultValues(data.widgetDefaults);
                homePO.clickDonateWidget();
            });

            it("donations start page should be loaded", (done) => {
                donationsPO.waitForDonationsContainerToBeLoaded()
                    .then(() => done());
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
