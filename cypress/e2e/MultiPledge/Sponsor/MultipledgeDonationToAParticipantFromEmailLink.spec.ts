import { waitForUrl } from "../../../support/utils/actions";
import { PageSetup } from "../../../support/utils/pageSetup";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import * as specificData from '../../../data/Pledge/MultipledgeDonationToAParticipantFromEmailLink.json'

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();

const donationCO = new Donation();

// ** Since this test uses the custom url, it will not work when run against QA **
//The calling of functions created in respective Pages
describe('Scenario -> Multi Pledge Sponsor to team from email link: ', function () {
	using(events, function (event) {
		describe(`${event}`, function () {
			before(() => {
				pageSetup.goToSite(`${data.URL}`, 5000);
				pageSetup.waitForPageLoad()
			});
			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
			});

			it('should start donation to a team', function () {
				cy.get(donationCO.honourRollContainer).should('be.visible')
				cy.get(donationCO.donationContainer).should('be.visible')
				cy.get(donationCO.privateMessageContainer).should('be.visible')
				donationCO.setAmount(data.donationAmount);
				donationCO.selectHonorRollOption(data.honourRoleOption);
				donationCO.enterPrivateMessage(data.privateMessage);
			});

			it('should enter the participant details', function () {
				flowPO.continue();
				registerPO.fillInProfileAndAddressInformation(data);
				cy.get(registerPO.container).should('be.visible')
			});

			it('should enter the CC details and display on the review page', function () {
				flowPO.continue();

				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.enterCardDetails(data.card);

				flowPO.continue();

				reviewPO.verifyProfileInformation(data);
				reviewPO.verifyPaymentInformation(data.card);
				reviewPO.verifyDonationAmount(data.totalAmount);
			});

			it('should verify the Transaction Number', function () {
				flowPO.continue();
				thankYouPO.verifyTransactionNumber(data);
			});

			// it('should go to participant page', function () {
			// 	thankYouPO.goToProfile();
			// 	waitForUrl('/Participant/', 3000);
			// });
		});
	});
});
