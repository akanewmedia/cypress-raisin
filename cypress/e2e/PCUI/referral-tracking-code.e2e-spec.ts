import { TrackingCodeComponent } from '../../pc-ui-e2e/src/component/tracking-code.component';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { DashboardPage } from '../../pc-ui-e2e/src/page/dashboard.page';
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page';
import { PageSetup } from '../../support/utils/pageSetup';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import * as specificData from '../../pc-ui-e2e/mock/data/edit-page/edit-my-page.json'


const referralCode = 'dianek90';

let dashboard: DashboardPage = new DashboardPage();
let createEmailPage: CreateEmailPage = new CreateEmailPage();
let trackingCodeComponent: TrackingCodeComponent = new TrackingCodeComponent();
let pageSetup: PageSetup = new PageSetup();
let loginPage: LoginPage = new LoginPage()
let snackbarCO: SnackbarCO = new SnackbarCO()

const using = require('jasmine-data-provider');

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

describe('TrackingCodeComponent tests:', () => {
  using(events, event => {

    before(() => {
      pageSetup.cleanupPage()
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    });

    it('should verify dashboard is visible', () => {
      dashboard.isVisible();
    });

    it('should have tracking code component', () => {
      cy.get(trackingCodeComponent.container).should('exist')
    });

    it('should have dialog with referralCode', () => {
      cy.get(trackingCodeComponent.shareCodeBtn).click();
      cy.get(trackingCodeComponent.dialog).should('contain.text', referralCode)
    });

    it('should verify Toast Messages after clicking on Copy Code and Copy Link', () => {
      //Click Copy Code and Verify Toast
      cy.contains('span.link', "Copy Code").click();
      cy.get(snackbarCO.messageContainer).should('contain.text', 'Your code has been copied to your clipboard')
      //Click Copy Link and Verify Toast
      cy.contains('span.link', "Copy Link").click();
      cy.get(snackbarCO.messageContainer).should('contain.text', 'Link has been copied to your clipboard')
    });

    it('should click on Email Friends and verify if the page loaded properly', () => {
      //Click to Email Friends
      cy.contains('button', "Email Friends").click();
      cy.url().should('include', '/emails/create')
      cy.get('[aria-label="Select email template"]').should('contain.text', "Join My Team");
    });
   
  })
});
