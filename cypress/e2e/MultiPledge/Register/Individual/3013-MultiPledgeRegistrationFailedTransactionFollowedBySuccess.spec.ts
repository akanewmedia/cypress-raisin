import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { FlowPage } from "../../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { generateUniqueName, waitForUrl } from "../../../../support/utils/actions";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { Waiver } from "../../../../support/components/waiver.co";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { TransactionFailed } from "../../../../support/pages/Pledge/transactionFailed";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegistrationFailedTransactionFollowedBySuccess.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const registerPO = new RegisterPage();
const flowPO = new FlowPage();

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const waiverCO = new Waiver()
const paymentPO = new PaymentPage();
const transactionFailedPO = new TransactionFailed();

//The calling of functions created in respective Pages
describe('TR(3013) Scenario -> Multi Pledge Register individual Fail then Success : ', () => {
	using(events, event => {
		describe(`${event}`, function () {
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
				registerCO.register(0, 1);
				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.createAccountButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')	
			});

			it('should enter user profile and card details', () => {
				returningParticipantCO.createAccount();
				waiverCO.selectWaiverAcceptance(true);
				flowPO.continue();
				registerPO.fillInMandatoryInformation(data);
				registerPO.profileInformationCO.selectGender(data.gender);

				flowPO.continue();
				//skip additional participants step
			});

			it('should verify payment and enter card details', () => {
				flowPO.continue();
				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.verifyTotalAmount(data.total);
				paymentPO.enterCardDetails(data.failedCard);
			});

			it('should verify review information', () => {
				flowPO.continue();
				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyPaymentInformation(data.failedCard);
				//Verification for Amount Section
				reviewPO.verifyTotalAmount(data.totalAmountWithRegFee);
			});

			it('should fail the transaction ', () => {
				flowPO.continue();
				//Validate it failed
				transactionFailedPO.verifyTransactionFailed();
			});
			it('should reenter the payment details', () => {
				transactionFailedPO.goBackToReview();
				// Go back one 
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyPaymentInformation(data.failedCard);
				reviewPO.editPaymentInfo();
				paymentPO.enterCardDetails(data.card);
				flowPO.continue();
				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyPaymentInformation(data.card);
				//Verification for Amount Section
				reviewPO.verifyTotalAmount(data.totalAmountWithRegFee);
			});

			it('should complete registration', () => {
				flowPO.continue();
				 
			});

			// it('should go to participant center', () => {
			// 	thankYouPO.startFundraising();
			// 	waitForUrl('Common/Participant/', 7000);
			// });
		});
	});
});