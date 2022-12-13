import { PageSetup } from "../../../support/utils/pageSetup";
import { ScoreboardPage } from "../../../support/pages/Pledge/ScoreboardPage";
import { PledgeRxfNavBarComponent } from "../../../support/components/pledgeRxfNavbar.co";
import * as specificData from '../../../data/Pledge/MultiPledgeWidgetsTopGroups.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const scoreboardPO = new ScoreboardPage();

const navbarCO = new PledgeRxfNavBarComponent();

describe('Scenario -> Multi Pledge top groups widget: ', () => {
    using(events, (event) => {
        describe('Checking the top groups widget for inactive groups', () => {
            before(() => {
                pageSetup = new PageSetup();
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });
            it('Should ensure inactive groups are not displayed in the widget', () => {
                navbarCO.clickOnScoreboardMenuItem();
                cy.get(scoreboardPO.container).should('exist')
                scoreboardPO.topGroups.exists(data.inactiveLocation.name).should('not.exist')
            });
        });
    });
});
