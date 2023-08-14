import { MainToolbar } from '../../pc-ui-e2e/src/component/main-toolbar';
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page';
import { PageSetup } from '../../support/utils/pageSetup';
import * as specificData from '../../pc-ui-e2e/mock/data/edit-page/edit-my-page.json'


let mainToolbar: MainToolbar = new MainToolbar()
let loginPage: LoginPage = new LoginPage()
let pageSetup: PageSetup = new PageSetup();

const using = require('jasmine-data-provider');

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

describe('Verify Badges:', () => {
  using(events, event => {

    before(() => {
      pageSetup.cleanupPage()
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    });

    it('should render toolbar', () => {
      cy.get(mainToolbar.container).should('be.visible')
    });

    it('should click on Badge Icon and verify if badges exist', () => {
      mainToolbar.clickOnBadge();
      cy.get('pc-badge-overview').should('be.visible')
      //Verifies amount of badges earned
      cy.get('div.badge-modal-body').should('contain.text', "1 of 4 earned")
      //Makes sure all badges are visible
      cy.get('div .badge-modal-card').its('length').should('eq', 4)
      //Verifies if Team Captain badge has an earning date
      cy.get('div.date').first().should('contain.text', '2023-07-25')
    });    

    
  })
});
