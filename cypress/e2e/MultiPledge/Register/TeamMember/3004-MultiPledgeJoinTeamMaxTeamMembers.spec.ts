//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { JoinTeamPage } from "../../../../support/pages/Pledge/joinTeamSearch";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeJoinTeamMaxTeamMembers.json'

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const joinTeamSearchPO = new JoinTeamPage();


//The calling of functions created in respective Pages
// TODO: Fix team size issue
// ** Requires event 17595 on production which has the team member limit set **
describe('TR(3004) Scenario -> Multi Pledge Team Member Registration Failure: ', function () {
	using(events, function (event) {
		describe(`${event}`, function () {
			before(() => {
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
			});

			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
			});

			it('should select registration details', function () {
				navbarCO.register();
				cy.get(registerCO.container).should('be.visible')
				registerCO.selectSubEventGroup(data.location);
				registerCO.register(1);
				cy.get(joinTeamSearchPO.container).should('be.visible')
				joinTeamSearchPO.searchFullTeam(data.teamname);
			});

			it('The join button should not exist and FULL button should be displayed', () => {
				cy.contains('.search-result--right > .ng-star-inserted > span', 'Full')			
			});
		});
	});
});