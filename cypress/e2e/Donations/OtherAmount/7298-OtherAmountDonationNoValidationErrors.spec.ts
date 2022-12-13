import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/OtherAmountDonation.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7298) Donations > Give Now > One Time > Custom Amount > Show all fields in Profile Information with only some mandatory (not triggering validation errors) > Credit Card > Complete : ', () => {
    using(events, (event) => {
        describe(`${event}`, function () {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                pageSetup.waitForPageLoad()
            });

            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });

            it('should populate the first step "Choose Your Donation" with a custom amount ', () => {
                donationsPO.donationDetails.enterOtherAmount(data);
            });

            it('should go to next step', () => {
                donationsPO.continue();
                donationsPO.stepper.isStepDisplayed(1)
            });

            it('should populate the second step "Enter Donor Information" and go to next step', () => {
                donationsPO.donorInformation.populateAllFields(data);
            });

            it('should verify the donation amount in the Donate button', () => {
                donationsPO.stepper.verifyDonationAmount(data.donationAmount);
            });

            it('should populate the final step "Enter Payment & Complete Donation"', () => {
                donationsPO.paymentInformation.populateAllFields(data.card);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
