// register + add a donation amount
// check cover adminfee
// continue until review page
// edit amount
// uncheck adminfee
// continue until review page
// verify adminfee is zero



//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { generateUniqueName } from "../../../../support/utils/actions";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterComponent } from "../../../../support/components/register.co";
import { Waiver } from "../../../../support/components/waiver.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { FlowPage } from "../../../../support/pages/flow";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import * as specificData from '../../../../data/Pledge/MultiPledgePaidRegCoverAdminFeeEditReview.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const waiverCO = new Waiver()
const returningParticipantCO = new ReturningParticipant();

const flowPO = new FlowPage();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();


//The calling of functions created in respective Function Pages
describe('C10530 Scenario -> Registration > Cover Admin Fee > Edit Review : ', function () {
	using(events, function (event) {
		describe(`${event}`, function () {
			before(() => {
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
				generateUniqueName(data);
			});

			after(() => {
				pageSetup.cleanupPage();
			});

			it('should select registration details', function () {
				navbarCO.register();					
				cy.get(registerCO.container).should('be.visible')
				registerCO.selectSubEventGroup(data.location);
				registerCO.register(0,1);
				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.createAccountButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')	
			});

			it('should create an account enter participant information, and add self donation', function () {
				returningParticipantCO.createAccount();
				waiverCO.selectWaiverAcceptance(true);
				flowPO.continue();
				registerPO.fillInMandatoryInformation(data);
				registerPO.profileInformationCO.selectGender(data.gender);
				flowPO.continue();
				//skip additional participants step
				flowPO.continue();				

                
				paymentPO.donate(data.donationAmount);
				cy.wait(1000)
                paymentPO.checkCoverAdminFee()
				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
				// Add Store Items and verify Total
				paymentPO.buyItem(0)				
				paymentPO.verifyTotalAmount(data.totalStore);
			});

			it('should display participant details on review page', function () {
				//verify total and message
				paymentPO.enterCardDetails(data.card);
				flowPO.continue();

				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyPaymentInformation(data.card);
				reviewPO.verifyAdminFee(data.adminFee)
				//Verification for Amount Section
				reviewPO.verifyTotalAmount(data.total);
			});

			it('Should click on Edit Amount, edit amount and uncheck admin fee', ()=> {
				reviewPO.editPaymentInfo()
				paymentPO.clearDonation()
				paymentPO.checkCoverAdminFee()
				paymentPO.enterCardDetails(data.card);
				flowPO.continue();
			})

			it('should display participant details on review page', function () {
				
				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyPaymentInformation(data.card);				
				//Verification for Amount Section
				reviewPO.verifyTotalAmount(data.totalAfterEdit);
			});

			it('should display thank you page and the participant centre', function () {
				flowPO.continue();
				 
			});			
		});
	});
});