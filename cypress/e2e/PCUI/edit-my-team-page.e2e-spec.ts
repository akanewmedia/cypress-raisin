import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import {
  scrollToElement,
  getKendoEditorContent,
  userLogin,
  waitForElement,
} from '../../pc-ui-e2e/src/utils/actions';
import { CreateTeamPage } from '../../pc-ui-e2e/src/page/create-team-page.page';
import { browser } from 'protractor';

describe('edit my team page', () => {
  let sidebar: Sidebar;
  let teamPagePO: CreateTeamPage;

  beforeAll(() => {
    sidebar = new Sidebar();
    teamPagePO = new CreateTeamPage();
  });

  it('should log in', () => {
    userLogin('tcCris');
  });

  it('should go to my team page', () => {
    waitForElement(sidebar.container);
    sidebar.clickTeamLink();
    sidebar.clickTeamPageLink();
    expect(teamPagePO.container.isPresent()).toBeTruthy();
    expect(teamPagePO.header.getText()).toContain('Team Page');
  });

  // TODO: Add once this functionality is implemented.
  // it('should click on create team button and create team', () => {
  //   teamPagePO.clickCreateTeamButton();
  // });

  it('should open edit panel on edit my page', () => {
    teamPagePO.editButton.click();
    expect(teamPagePO.editpanel.isPresent()).toBeTruthy();
    teamPagePO.editpanel.enterPageTitle('new title');
    teamPagePO.editpanel.enterPageUrl('newurl');
    teamPagePO.editpanel.enterPageFundraisingGoal('1234');
    expect(teamPagePO.editpanel.pageTitle.getAttribute('value')).toContain(
      'new title'
    );
    expect(teamPagePO.editpanel.pageUrl.getAttribute('value')).toContain(
      'newurl'
    );
    expect(
      teamPagePO.editpanel.pageFundraisingGoal.getAttribute('value')
    ).toContain('1234');
  });

  xit('should enter text into the my story field', async () => {
    await teamPagePO.editpanel.enterMyStory('My Story');
    expect(getKendoEditorContent(teamPagePO.editpanel.myStory)).toEqual(
      'My Story'
    );
  });

  it('should save and close panel', () => {
    teamPagePO.editpanel.saveButton.click();
    teamPagePO.editpanel.waitForDrawerToClose();
    expect(teamPagePO.editpanel.isVisible()).toEqual(false);
  });

  it('should verify page preview is updated', () => {
    teamPagePO.switchToPreview();
    browser.sleep(1000);
    // expect(teamPagePO.pagePreview.fundraisingGoal.getText()).toEqual('GOAL: $1,234.00');
    expect(teamPagePO.pagePreview.pageTitle.getText()).toEqual('new title');
    //expect(teamPagePO.pagePreview.myStory.getText()).toEqual('My Story');
  });

  it('should open edit panel and validate page title', () => {
    teamPagePO.switchToMainWindow();
    scrollToElement(teamPagePO.editButton);
    teamPagePO.editButton.click();
    expect(teamPagePO.editpanel.isPresent()).toBeTruthy();
    expect(teamPagePO.editpanel.pageTitle.getAttribute('value')).toEqual(
      'new title'
    );
    expect(
      teamPagePO.editpanel.pageFundraisingGoal.getAttribute('value')
    ).toEqual('1234');
  });

  xit('should validate my story', async () => {
    expect(getKendoEditorContent(teamPagePO.editpanel.myStory)).toEqual(
      'My Story'
    );
  });
});
