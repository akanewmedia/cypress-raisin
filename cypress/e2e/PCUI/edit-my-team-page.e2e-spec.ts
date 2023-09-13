import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { scrollToElement } from '../../pc-ui-e2e/src/utils/actions';
import { CreateTeamPage } from '../../pc-ui-e2e/src/page/create-team-page.page';
import { PageSetup } from '../../support/utils/pageSetup';
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page';
import { getLocalDateTime } from '../../support/utils/actions';
import * as specificData from '../../pc-ui-e2e/mock/data/edit-page/edit-my-page.json' 

let loginPage: LoginPage = new LoginPage()
let sidebar: Sidebar = new Sidebar();
let teamPagePO: CreateTeamPage = new CreateTeamPage()
let pageSetup: PageSetup = new PageSetup();

const using = require('jasmine-data-provider');

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

describe('edit my team page', () => {

  let title = data.title + getLocalDateTime()
  let url = data.url + getLocalDateTime()
  let goal = (Math.floor(Math.random() * 9000 + 1000)).toString();
  let story = 'Story Test ' + getLocalDateTime()


  using(events, event => {

    before(() => {
      pageSetup.cleanupPage()
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    });


    it('should go to my team page', () => {
      sidebar.clickTeamLink();
      //sidebar.clickTeamPageLink();
      cy.get(teamPagePO.container).should('be.visible')
      cy.get(teamPagePO.header).should('contain.text', "Team Page");
    });

    // TODO: Add once this functionality is implemented.
    // it('should click on create team button and create team', () => {
    //   teamPagePO.clickCreateTeamButton();
    // });

    it('should open edit panel on edit my page', () => {
      cy.get(teamPagePO.editButton).click();
      cy.get(teamPagePO.editPanel.container).should('be.visible')
      cy.wait(1000)
      teamPagePO.editPanel.enterPageTitle(title);
      teamPagePO.editPanel.enterPageUrl(url);
      teamPagePO.editPanel.enterPageFundraisingGoal(goal);
      teamPagePO.editPanel.getKendoEditor().clear().type(story)

      teamPagePO.editPanel.clickSaveButton();
      cy.wait(3000)
      cy.reload()
      cy.wait(3000)
    })

    it('should verify page preview is updated', () => {
      teamPagePO.editPanel.verifyPreviewTitle(title)
      teamPagePO.editPanel.verifyPreviewGoal(goal)
      teamPagePO.editPanel.verifyPreviewStory(story)
    });
  })
})
