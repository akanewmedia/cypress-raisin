//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { generateUniqueName, waitForUrl } from "../../../../support/utils/actions";
import  using  from 'jasmine-data-provider';
import { FlowPage } from "../../../../support/pages/flow";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { Waiver } from "../../../../support/components/waiver.co";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterAndBuyStoreItemWithPromoCode.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();

const flowPO = new FlowPage();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const waiverCO = new Waiver()

//The calling of functions created in respective Function Pages
describe('TR(23) Scenario -> Multi Pledge Register And Buy Store Item With PromoCode  : ', () => {
	using(events, event => {
		describe(`${event}`, () => {
			before(() => {
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
				generateUniqueName(data);
			});

			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
			});

			it('should select registration details', () => {
				navbarCO.register();					
				cy.get(registerCO.container).should('be.visible')
				registerCO.selectSubEventGroup(data.location);
				registerCO.register(0);
				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.createAccountButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')			
			});
			it('should create an account enter participant information, and add items to cart', () => {
				returningParticipantCO.createAccount();
				waiverCO.selectWaiverAcceptance(true);
				flowPO.continue();
				registerPO.fillInMandatoryInformation(data);
				registerPO.profileInformationCO.selectGender(data.gender);
				flowPO.continue(); // skip additional participants
				flowPO.continue();
			});
			it('should add payment details and promo code', () => {							
				paymentPO.buyItem(0);
				paymentPO.buyItem(1);
				paymentPO.verifyPaymentFieldsPresent();	
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.verifyTotalAmount(data.total);
				paymentPO.enterStorePromoCode(data.storePromoCode);				
				cy.wait(1000);
				paymentPO.verifyTotalAmount(data.totalAfterPromo);
			});

			it('should display participant details on review page', () => {
				//verify total and message
				paymentPO.enterCardDetails(data.card);
				flowPO.continue();

				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyPaymentInformation(data.card);
				//Verification for Amount Section
				reviewPO.verifyTotalAmount(data.totalAmountWithRegFee);
			});

			 it('should display thank you page and the participant centre', () => {
			 	flowPO.continue();
			 	thankYouPO.verifyTransactionNumber(data);
			 });

			//  it('should go to participant center', () => {
			//  	thankYouPO.verifiyStartFundraisingIsPresent();
			//  	waitForUrl('Common/Participant/');
			// });
		});
	});
});