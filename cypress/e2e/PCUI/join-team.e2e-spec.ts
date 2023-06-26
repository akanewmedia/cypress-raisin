import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { TeamProgressPage } from '../../pc-ui-e2e/src/page/team-progress.page';
import { CreateTeamPage } from '../../pc-ui-e2e/src/page/create-team-page.page';
import { userLogin, waitForElement } from '../../pc-ui-e2e/src/utils/actions';

describe('join team funtionality:', () => {
  let sidebar: Sidebar;
  let createEmailPage: CreateEmailPage;
  let snackbarCO: SnackbarCO;
  let teamProgressPage: TeamProgressPage;
  let teamPagePO: CreateTeamPage;

  beforeAll(() => {
    sidebar = new Sidebar();
    createEmailPage = new CreateEmailPage();
    teamProgressPage = new TeamProgressPage();
    snackbarCO = new SnackbarCO();
    teamPagePO = new CreateTeamPage();
  });

  it('should log in', () => {
    userLogin('NoteamOne');
  });

  it('should go to join team page', () => {
    sidebar.clickTeamLink();
    // sidebar.clickTeamPageLink();
    expect(teamPagePO.container.isPresent()).toBeTruthy();
    expect(teamPagePO.header.getText()).toContain('Team Page');
  });

  it('should search for a team and join', async () => {
    await teamPagePO.joinpanel.enterSearch('the rebel');
    await expect(
      teamPagePO.joinpanel.getRowNameValue(
        teamPagePO.joinpanel.getTeams().get(0)
      )
    ).toContain('The Rebel Alliance');

    await expect(
      teamPagePO.joinpanel.getRowNameValue(
        teamPagePO.joinpanel.getTeams().get(1)
      )
    ).toContain('The Rebel Alliance Reserves');

    await teamPagePO.joinpanel.clickJoinTeamButton(
      teamPagePO.joinpanel.getTeams().get(0)
    );

    await waitForElement(teamProgressPage.contactsListComponent.container);
    await expect(teamProgressPage.header.getText()).toContain('Team Progress');
  });

  xit('select one team members and send email', () => {
    teamProgressPage.contactsListComponent.contactsTable.clickEmailButton(
      teamProgressPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    expect(createEmailPage.container.isPresent()).toBeTruthy();
    expect(createEmailPage.header.getText()).toContain('E-mail');
    expect(createEmailPage.templateTypeDropDown.getText()).toContain('Blank');
    createEmailPage.clickSendEmailButton();
    expect(snackbarCO.messageContainer.getText()).toContain(
      'Email sent to 1 contact(s)'
    );
  });
});
