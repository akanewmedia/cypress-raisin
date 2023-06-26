import { browser } from 'protractor';
import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { TeamProgressPage } from '../../pc-ui-e2e/src/page/team-progress.page';
import { userLogin, waitForElement } from '../../pc-ui-e2e/src/utils/actions';

describe('team progress functionality + send emails:', () => {
  let sidebar: Sidebar;
  let createEmailPage: CreateEmailPage;
  let snackbarCO: SnackbarCO;
  let teamProgressPage: TeamProgressPage;

  beforeAll(() => {
    sidebar = new Sidebar();
    createEmailPage = new CreateEmailPage();
    teamProgressPage = new TeamProgressPage();
    snackbarCO = new SnackbarCO();
  });

  it('should log in', () => {
    userLogin('tcOne');
  });

  it('should go to team-progress', async () => {
    await sidebar.clickTeamExpandLink();
    await sidebar.clickTeamProgressPageLink();
    await waitForElement(teamProgressPage.contactsListComponent.container);
    await expect(teamProgressPage.header.getText()).toContain('Team Progress');
  });

  it('select one team members and send email', async () => {
    await teamProgressPage.contactsListComponent.contactsTable.clickEmailButton(
      teamProgressPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    await waitForElement(createEmailPage.container);
    await expect(createEmailPage.container.isPresent()).toBeTruthy();
    await expect(createEmailPage.header.getText()).toContain('E-mail');
    await expect(createEmailPage.templateTypeDropDown.getText()).toContain('EMAIL_TO_TEAMMATES');
    await createEmailPage.clickSendEmailButton();
    await expect(snackbarCO.messageContainer.getText()).toContain(
      'Email sent to 1 contact(s)'
    );
  });

  it('select multiple team members and send email', () => {
    sidebar.clickTeamProgressPageLink();
    teamProgressPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(
      teamProgressPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    teamProgressPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(
      teamProgressPage.contactsListComponent.contactsTable.getContacts().get(1)
    );
    teamProgressPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(
      teamProgressPage.contactsListComponent.contactsTable.getContacts().get(2)
    );
    teamProgressPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(
      teamProgressPage.contactsListComponent.contactsTable.getContacts().get(3)
    );
    teamProgressPage.contactsListComponent.clickEmailSelectedButton();
    browser.sleep(1000);
    expect(createEmailPage.container.isPresent()).toBeTruthy();
    expect(createEmailPage.header.getText()).toContain('E-mail');
    expect(createEmailPage.templateTypeDropDown.getText()).toContain('EMAIL_TO_TEAMMATES');
    createEmailPage.clickSendEmailButton();
    expect(snackbarCO.messageContainer.getText()).toContain(
      'Email sent to 4 contact(s)'
    );
  });

  it('should toggle captain slider', async () => {
    sidebar.clickTeamProgressPageLink();
    
    const checkedOriginal = await teamProgressPage.contactsListComponent.contactsTable.getRowCaptainToggleValue(
      teamProgressPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    
    await teamProgressPage.contactsListComponent.contactsTable.clickRowCaptainToggleButton(
      teamProgressPage.contactsListComponent.contactsTable.getContacts().get(0)
    );

    const checkedNew = await teamProgressPage.contactsListComponent.contactsTable.getRowCaptainToggleValue(
      teamProgressPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    
    browser.sleep(1000);
    
    expect(checkedOriginal).toBeDefined();
    expect(checkedNew).toBeDefined();
    expect(checkedOriginal).not.toBe(checkedNew);
  });
});