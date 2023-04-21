import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/FormBuilder-OneTimeAllFieldsRequired.json'
import { concat } from "lodash";

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

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

            it('should validate BLANK Other Amount', () => {                
                cy.get(donationsPO.container).should('be.visible')
                donationsPO.donationDetails.donationMatrix.clearCustomAmount()
                donationsPO.continue();
                donationsPO.verifyOtherAmount(data.otherAmount.otherAmountBlank);                            
            });

            it('should validate NEGATIVE Other Amount', () => {                
                donationsPO.donationDetails.donationMatrix.setOtherAmountManually('-1')
                donationsPO.continue();
                donationsPO.verifyOtherAmount(data.otherAmount.otherAmountNegative);                            
            });

            it('should validate Other Amount BETWEEN 5 and 10000000', () => {                
                donationsPO.donationDetails.donationMatrix.setOtherAmountManually('2')
                donationsPO.continue();
                donationsPO.verifyOtherAmount(data.otherAmount.otherAmountBetween);                            
            });

            it('should validate BLANK Fund', () => {
                donationsPO.continue();               
                donationsPO.verifyFund(data.fundAllocation.fundBlank);            
            });

            it('should validate INVALID Fund', () => {
                donationsPO.continue();                
                donationsPO.donationDetails.donationMatrix.typeFund()
                donationsPO.verifyFund(data.fundAllocation.fundInvalid);  
            });

            // it('should validate if Other Funds is BLANK', () => {
            //     cy.get(donationsPO.container).should('be.visible')                
            //     donationsPO.continue();                
            //     donationsPO.verifyFund(data.fundAllocation.fundBlank);            
            // });
        })
    })
})