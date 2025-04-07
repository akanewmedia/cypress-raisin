import { waitForUrl } from "../../../support/utils/actions";
import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavBar.co";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationToTeamFromPageLink.json'



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
const donationSearchPO = new DonationSearchPage();

const donationCO = new Donation();
const navbarCO = new PledgeNavBarComponent();

//The calling of functions created in respective Pages
describe('TR(3022) Scenario -> Multi Pledge Sponsor Team from Donation Page Link: ', function () {
	using(events, function (event) {
		describe(`${event}`, function () {
			before(() => {
				pageSetup.goToEvent(`${event}/${data.URL}`);
				pageSetup.waitForPageLoad()
			});

			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
			});

			it('should be the Donation Search page', function () {
				cy.get(donationSearchPO.container).should('be.visible')				
			});

			it('should start donation to a Team', function () {
				navbarCO.donate();
				cy.get(donationSearchPO.container).should('be.visible')
				donationSearchPO.clickTeamButton();
				donationSearchPO.searchAndSelectFirstOption(data.teamname);
				cy.get(donationCO.honourRollContainer).should('be.visible')
				cy.get(donationCO.donationContainer).should('be.visible')
				donationCO.setAmount(data.donationAmount);
				donationCO.selectHonorRollOption(data.honourRoleOption);
			});

			it('should enter the Team details', function () {
				flowPO.continue();
				registerPO.fillInProfileAndAddressInformation(data);
				cy.get(registerPO.container).should('be.visible')
			});

			it('should enter the donnor details and display on the review page', function () {
				flowPO.continue();

				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.enterCardDetails(data.card);

				flowPO.continue();

				reviewPO.verifyProfileInformation(data);
				reviewPO.verifyPaymentInformation(data.card);
			});

			it('should verify the Transaction Number', function () {
				flowPO.continue();
				 
			});

			it('should go to team page', () => {
				thankYouPO.goToProfile();
			});

			it(`should be on the team page for ${data.teamname}`, () => {
				waitForUrl('/t/');
			});
		});
	});
});
