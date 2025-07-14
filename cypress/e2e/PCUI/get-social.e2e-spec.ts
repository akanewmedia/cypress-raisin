import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { PageSetup } from "../../support/utils/pageSetup";
import * as specificData from '../../data/Pledge/base.json'
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page'
import { GetSocialPage } from '../../pc-ui-e2e/src/page/get-social.page';


let loginPage: LoginPage;
let sidebar: Sidebar;
let getSocialPage: GetSocialPage;
let snackbarCO: SnackbarCO;

loginPage = new LoginPage();
sidebar = new Sidebar();
snackbarCO = new SnackbarCO();
getSocialPage = new GetSocialPage();

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

describe('Get Social UI:', () => {
  using(events, event => {

    before(() => {
      pageSetup.cleanupPage()
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login('DaveAutoTestCaptain', 'Akaaka1!')
    });


    it('should go to Get Social - Message Examples', () => {
      sidebar.clickGetSocialLink();
      cy.get(getSocialPage.container).should('exist')
      cy.get(getSocialPage.header).should('have.text', 'Get Social')
    });

    it('should verify sub title copies', () => {
      cy.get(getSocialPage.pageTipHeader).should('contain.text', 'Up to 40% of donations start with social shares!')
      cy.get(getSocialPage.pageTipContent).should('contain.text', 'Get inspired by these messages and spread the word with your network today asking for support.')
      cy.get(getSocialPage.socialStep1).should('contain.text', 'Step 1: Choose a post')
      cy.get(getSocialPage.socialHint1).should('contain.text', 'Copy or edit from the examples below and choose a network to share the post. These posts are AI generated, please double-check the results.')
      cy.get(getSocialPage.socialStep2).should('contain.text', 'Step 2: Share your message to raise awareness on the limited lifecycle of a post')
      cy.get(getSocialPage.socialHint2).should('contain.text', "Did you know the average post is only seen for a few hours? Post often so your network doesn't miss the chance to support you.")
    });

    it('should verify social filter labels', () => {
      getSocialPage.verifySocialFilterLabels();
    });

    it('should verify tones', () => {
      cy.get(getSocialPage.socialMsgTone).should('contain.text', "Heartfelt")
      cy.contains('button', 'Join Event').click()
      cy.get(getSocialPage.socialMsgTone).should('contain.text', "Serious")
    });

    it('should verify Copy/Edit and Social Media controls', () => {
      cy.get(getSocialPage.socialMsgCard).first().within(() => {
        cy.contains('button', 'Copy')
        cy.contains('button', 'Edit').click()
      }
    )
    cy.get(getSocialPage.socialShare).should('be.visible')
    cy.get(getSocialPage.socialPostEditorText).should('exist')
    cy.get('#social-post-editor-close').click()
    });

    it('should verify if Event and Org Name are displayed', ()=> {
      cy.get(getSocialPage.socialMsgCard).first().should('contain', 'RXF Multi Pledge Automation Event')
      cy.get(getSocialPage.socialMsgCard).first().should('contain', 'Testing Xperts Automation Canada')
    })
  })
});
