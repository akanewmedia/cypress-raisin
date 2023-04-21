import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/FormBuilder-DonorInformation.json'
import { concat } from "lodash";
import { DonationMatrix } from "../../../support/components/donationDetails.co";

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();
const donationMatrix = new DonationMatrix()

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('Form-Builder - One Time All Fields Required ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                pageSetup.waitForPageLoad()
                //pageSetup.cleanupPage();
            });

            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });

            it('should allow the user to select the donation type "General Donation"', () => {
                donationsPO.selectDonationType(data.typeTabSelection);
                donationsPO.verifySelectedDonationType(data.typeTabSelection);
            });

            it('should allow the user to select the donation frequency "One-Time"', () => {
                donationsPO.selectDonationFrequency(data.frequencyButtonSelection);
                donationsPO.verifySelectedDonationFrequency(data.frequencyButtonSelection);
            });     

            it('should display donation matrix for one-time frequency and select donation and fund', () => {
                donationsPO.getDonationMatrixAmounts(data.matrixValues.oneTimeGeneralDonation)
                donationsPO.selectDonationMatrixAmount(data.matrixButtonSelection);
                donationMatrix.selectFund(data.fund)
            });           

            
        })
    })
})