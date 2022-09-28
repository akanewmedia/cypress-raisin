import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { data } from '../../../data/Pledge/MultiPledgeMidFlowDonationRedirectLegacyURL'



//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();

const event = '/rxfmpaee'

const donationSearchPO = new DonationSearchPage();

//The calling of functions created in respective Pages
describe('TR(1950) Scenario -> Multi Pledge Mid-Flow Donation Redirection: ', function () {
	
		describe(`${event}`, function () {
			before(() => {
				pageSetup = new PageSetup();
				pageSetup.goToEvent(`${event}/${data.URL}`);
			});

			it('should be the Donation Search page', function () {
				cy.get(donationSearchPO.container).should('be.visible')				
			});
		});
	});

