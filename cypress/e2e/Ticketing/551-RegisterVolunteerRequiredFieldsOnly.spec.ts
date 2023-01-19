import { PageSetup } from "../../support/utils/pageSetup";
import { YourInformationPage } from "../../support/pages/Ticketing/YourInformationPage";
import { VolunteerThankYouPage } from "../../support/pages/Ticketing/VolunteerThankYouPage";
import { FlowPage } from "../../support/pages/flow";
import { TicketingNavBar } from "../../support/components/ticketingNavbar.co";
import * as specificData from '../../data/Ticketing/RegisterVolunteerRequiredFieldsOnly.json'


//The information regarding the Library
const using = require('jasmine-data-provider');

let pageSetup: PageSetup = new PageSetup();

//To get the Test Data
const data = pageSetup.getData('Ticketing', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().ticketing, data.events);

const registerPO = new YourInformationPage();
const thankYouPO = new VolunteerThankYouPage();
const flowPO = new FlowPage();

const navbarCO = new TicketingNavBar();

describe('TR(551) Scenario -> Register Volunteer (required fields only): ', function () {
	using(events, function (event) {
		describe(`${event}`, function () {
			before(function () {
				pageSetup = new PageSetup();
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
				//pageSetup.logoutIfLoggedIn();
				//pageSetup.clearCart();
			});

			after(() => {
				pageSetup.goToEvent(event);
				//pageSetup.logoutIfLoggedIn();
				pageSetup.cleanupPage()
			});

			it('Should go to the volunteer registration page', () => {
				navbarCO.clickOnVolunteerMenuItem();
			});

			it('Should see validation errors when trying to continue before filling the required fields', () => {
				flowPO.continue();
				cy.wait(1000)
				cy.get(registerPO.container).should('be.visible')
				registerPO.verifyRequiredFieldErrors(data.requiredFieldsValidationMessages);
			});

			it('Should fill out the required fields', () => {
				registerPO.fillInAllFields(data);
			});

			it('Should submit the volunteer registration', () => {
				flowPO.continue();
				cy.get(thankYouPO.thankYouMessageContainer).should('be.visible')
				thankYouPO.verifyVolunteerThankYouMessage(data.volunteerThankYouMessage);
			});
		});
	});
});