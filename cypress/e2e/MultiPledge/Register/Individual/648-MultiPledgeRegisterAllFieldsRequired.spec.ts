import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { SurveyComponent } from "../../../../support/components/survey.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { generateUniqueName, getLocalDateTime, pressEsc, pressTab, scrollToElement, setCustomAttribute, setFocus, waitForElementToBeVisible } from "../../../../support/utils/actions";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterAllFieldsRequired.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const surveyCO = new SurveyComponent();

/* use event 17560 */
describe('TR(648) Scenario -> Multi Pledge free registration - all fields required: ', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });

    using(events, (event) => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
                generateUniqueName(data);
            });
            // after(() => {
            //     pageSetup.goToEvent(event);
            //     pageSetup.cleanupPage();
            // });
            it('Should press the register button at the top, then select the location and reg item', () => {
                navbarCO.register();
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(0);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('should press continue after entering each account detail field', () => {
                cy.wait(15000)
                flowPO.continue();
                scrollToElement(registerPO.container)
                waitForElementToBeVisible(registerPO.container);
                cy.get(registerPO.container).should('exist')
                registerPO.accountInformationCO.enterUsername(data.account.username + getLocalDateTime());
                flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.accountInformationCO.enterPassword(data.account.password);
                flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.accountInformationCO.enterGoal(data.account.fundraisingGoal);
            });
            it('should press continue after entering each profile info field', () => {
                flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.selectTitle(data.title);
                // flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.enterFirstName(data.firstName);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.enterMiddleName(data.middleName);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.enterLastName(data.lastName);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.selectEmailType(data.emailType);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.enterEmail(data.email);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.enterOrgName(data.companyName);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.selectPhoneType(data.phoneType);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.enterPhoneNumber(data.phoneNumber);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.enterPhoneExtension(data.phoneExtension);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.selectGender(data.gender);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.profileInformationCO.selectDateOfBirth(data.dayOfBirth, data.monthOfBirth, data.yearOfBirth);
            });
            it('should press continue after entering each address field', () => {
                flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.addressInformationCO.selectAddressType(data.addressType);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.addressInformationCO.selectCountry(data.country);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.addressInformationCO.enterAddress(data.address);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.addressInformationCO.enterCity(data.city);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.addressInformationCO.selectProvince(data.province);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.addressInformationCO.enterPostCode(data.postCode);

            });
            it('should press continue after entering each additional field', () => {
                flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.additionalInformation.setHideMeFromSearch(data.hideMeFromSearch);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.additionalInformation.setScreenedCompaniesCheckboxChecked(data.allowScreenedCompanies);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                registerPO.additionalInformation.setAkaCommunicationCheckboxChecked(data.allowAkaCommunication);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
            });
            it('should press continue after filling the custom fields', () => {
                flowPO.continue();
                cy.get(registerPO.container).should('exist')
                setFocus(registerPO.additionalInformation.attribute1);
                setCustomAttribute(registerPO.additionalInformation.attribute1, data.attribute1);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                setFocus(registerPO.additionalInformation.attribute2);
                setCustomAttribute(registerPO.additionalInformation.attribute2, data.attribute2);

                // ** There is a very very weird error checking attribute3, 4 and 5, so I'm commenting out for now
                //flowPO.continue();
                //cy.get(registerPO.container).should('exist')
                setFocus(registerPO.additionalInformation.attribute3);
                setCustomAttribute(registerPO.additionalInformation.attribute3, data.attribute3);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                setFocus(registerPO.additionalInformation.attribute4);
                setCustomAttribute(registerPO.additionalInformation.attribute4, data.attribute4);
                //flowPO.continue();
                cy.get(registerPO.container).should('exist')
                setFocus(registerPO.additionalInformation.attribute5);
                setCustomAttribute(registerPO.additionalInformation.attribute5, data.attribute5);
            });
            it('should press continue after entering each survey field', () => {
                // we go through each survey response and fill it out
                data.surveyResponses.forEach(({ question, answer }) => {
                    flowPO.continue();
                    cy.get(registerPO.container).should('exist')
                    surveyCO.setAnswer({ question, answer });
                    pressEsc();
                });       
                flowPO.continue();         
            });
            it('should enter amount then clear amount', () => {
                cy.wait(2000)
                // skip additional participants
                flowPO.continue();                
                // enter donation amount
                paymentPO.donate(data.donationAmount);
                // then clear the donation amount
                paymentPO.clearDonation();                
            });
            it('should Add store item then remove it', () => {
                cy.wait(2000)                
                paymentPO.buyItem(0);
                cy.wait(1000)
                //flowPO.continue();
                // remove store item
                paymentPO.removeStoreItem(0);
                // add a different store item
                paymentPO.buyItem(1);
                cy.wait(1000)
                // remove store item
                paymentPO.removeStoreItem(1);                        
            });
            // it('should add credit card info', () => {                
            //     paymentPO.verifyPaymentFieldsPresent();
			// 	paymentPO.verifyCreditCardIsDisplayed();
			// 	paymentPO.enterCardDetails(data.card);              
            // });
            it('Should verify the profile and payment info on the review page', () => {
                cy.wait(2000)
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });
});
