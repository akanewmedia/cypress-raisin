//The information regarding the Library
import { Donation } from "../../../support/components/donation.co";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavbar.co";
import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../support/pages/flow";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
//import { waitForUrl } from "../../../support/utils/actions";
//import using from "jasmine-data-provider";
import { data } from '../../../data/Pledge/base.js'


//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();

//const data = pageSetup.getData('Pledge', 'MultiPledgeDonationToTeam');
const event = '/rxfmpaee'

const donationCO = new Donation();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const navbarCO = new PledgeNavBarComponent();
const donationSearchPO = new DonationSearchPage();

//The calling of functions created in respective Pages
describe('TR(657) Scenario -> Multi Pledge Search For Team And Donate : ', () => {
	context("Donate to Team", ()=> {
		
			before(() => {
				pageSetup.goToEvent(event);
				//pageSetup.logoutIfLoggedIn();
			});

			// after(() => {
			// 	pageSetup.goToEvent(event);
			// 	pageSetup.logoutIfLoggedIn();
			// 	pageSetup.cleanupPage();
			// });

			it('should start donation to a Team', () => {
				navbarCO.donate();
				cy.get(donationSearchPO.container).should('be.visible');			

				donationSearchPO.clickTeamButton();
				donationSearchPO.searchAndSelectFirstOption(data.teamname);

				cy.get(donationCO.honourRollContainer).should('be.visible');
				cy.get(donationCO.donationContainer).should('be.visible');				

				donationCO.setAmount(data.donationAmount);
				donationCO.selectFirstHonorRollOption(data.honourRoleOptionIndex);
			});

			it('should enter the Team details', () => {
				flowPO.continue();
				cy.wait(3000)
				registerPO.fillInProfileAndAddressInformation(data);
				cy.get(registerPO.container).should('be.visible');
				
			});

			it('should enter the donnor details and display on the review page', () => {
				flowPO.continue();
				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.enterCardDetails(data.card);

				flowPO.continue();
				reviewPO.verifyProfileInformation(data);
				reviewPO.verifyPaymentInformation(data.card);
			});

			it('should verify the Transaction Number', () => {
				cy.wait(3000)
				flowPO.continue();
				thankYouPO.verifyTransactionNumber(data);
			});

			it('should go to team page', () => {
				thankYouPO.goToProfile();
			});

			it(`should be on the team page for ${data.teamname}`, () => {
				cy.wait(2000)
				cy.url().should('include', '/team/')
				cy.get('.page-preview-title').get('h1').should('have.text', "Welcome to " + data.teamname + "'s page")
				//waitForUrl('/team/', 5000);
			});
		});
	});
