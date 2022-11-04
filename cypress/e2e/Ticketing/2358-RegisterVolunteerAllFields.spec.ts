import { PageSetup } from "../../support/utils/pageSetup";
import { YourInformationPage } from "../../support/pages/Ticketing/YourInformationPage";
import { VolunteerThankYouPage } from "../../support/pages/Ticketing/VolunteerThankYouPage";
import { FlowPage } from "../../support/pages/flow";
import { TicketingNavBar } from "../../support/components/ticketingNavbar.co";
import { SurveyComponent } from "../../support/components/survey.co";
import * as specificData from '../../data/Ticketing/RegisterVolunteerAllFields.json'


//The information regarding the Library
const using = require('jasmine-data-provider');

let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Ticketing', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().ticketing, data.events);

const registerPO = new YourInformationPage();
const thankYouPO = new VolunteerThankYouPage();
const flowPO = new FlowPage();

const navbarCO = new TicketingNavBar();
const surveyCO = new SurveyComponent();

describe('TR(2358) Scenario -> Register Volunteer (all fields): ', function () {
	using(events, function (event) {
		describe(`${event}`, function () {
			before(function () {
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
				//pageSetup.logoutIfLoggedIn();
				//pageSetup.clearCart();
			});

			after(() => {
				pageSetup.goToEvent(event);
				//pageSetup.logoutIfLoggedIn();
				pageSetup.cleanupPage();
			});

			it('Should go to the volunteer registration page', () => {
				navbarCO.clickOnVolunteerMenuItem();
			});

			it('Should fill out all the fields', () => {
				registerPO.fillInAllFields(data);
				surveyCO.fill(data.surveyResponses);
			});

			it('Should submit the volunteer registration', () => {
				flowPO.continue();
				cy.get(thankYouPO.thankYouMessageContainer).should('be.visible')
				thankYouPO.verifyVolunteerThankYouMessage(data.volunteerThankYouMessage);
			});
		});
	});
});