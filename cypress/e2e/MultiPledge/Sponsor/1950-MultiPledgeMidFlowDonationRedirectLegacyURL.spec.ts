import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import * as specificData from '../../../data/Pledge/MultiPledgeMidFlowDonationRedirectLegacyURL.json'



//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const donationSearchPO = new DonationSearchPage();

//The calling of functions created in respective Pages
describe('TR(1950) Scenario -> Multi Pledge Mid-Flow Donation Redirection: ', function () {
	using(events, event => {
		describe(`${event}`, function () {
			before(() => {
				pageSetup.goToEvent(`${event}/${data.URL}`);
				pageSetup.waitForPageLoad()
			});

			it('should be the Donation Search page', function () {
				cy.get(donationSearchPO.container).should('be.visible')				
			});
		});
	});
});

