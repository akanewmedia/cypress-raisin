import { browser } from 'protractor';
import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { FollowUpsPage } from '../../pc-ui-e2e/src/page/follow-ups.page';
import { userLogin } from '../../pc-ui-e2e/src/utils/actions';

describe('send email from follow ups:', () => {
  let sidebar: Sidebar;
  let createEmailPage: CreateEmailPage;
  let snackbarCO: SnackbarCO;
  let followUpsPage: FollowUpsPage;

  beforeAll(() => {
    sidebar = new Sidebar();
    createEmailPage = new CreateEmailPage();
    followUpsPage = new FollowUpsPage();
    snackbarCO = new SnackbarCO();
  });

  it('should log in', () => {
    userLogin('DaveHeaderOneTestOne');
  });

  it('should go to follow-ups', () => {
    sidebar.clickFollowUpsLink();
    expect(followUpsPage.isVisible()).toBeTruthy();
    expect(followUpsPage.header.getText()).toContain('Follow Ups');
  });

  it('search for barry and send email, should auto populate thank you template', async () => {
    await sidebar.clickFollowUpsLink();
    await followUpsPage.enterContactSearch('barry');
    await expect(
      followUpsPage.getContactsTable().getRowNameValue(
        followUpsPage.getContactsTable().getContacts().first()
      )
    ).toContain('Barry Blinkerton');

    await followUpsPage.getContactsTable().clickEmailButton(
      followUpsPage.getContactsTable().getContacts().get(0)
    );
    await expect(createEmailPage.isVisible()).toBeTruthy();
    await expect(createEmailPage.header.getText()).toContain('E-mail');
    await expect(createEmailPage.templateTypeDropDown.getText()).toContain(
      'THANK_YOU'
    );
  });

  it('search for Carla and send email, should auto populate follow up template', async () => {
    await sidebar.clickFollowUpsLink();
    await followUpsPage.enterContactSearch('carla');
    await expect(
      followUpsPage.getContactsTable().getRowNameValue(
        followUpsPage.getContactsTable().getContacts().first()
      )
    ).toContain('Carla');

    await followUpsPage.getContactsTable().clickEmailButton(
      followUpsPage.getContactsTable().getContacts().get(0)
    );
    await expect(createEmailPage.isVisible()).toBeTruthy();
    await expect(createEmailPage.header.getText()).toContain('E-mail');
    await expect(createEmailPage.templateTypeDropDown.getText()).toContain(
      'FOLLOW_UP'
    );
  });

  it('search for Queenie and send email, should auto populate sponsor me template and send email', async () => {
    await sidebar.clickFollowUpsLink();
    await followUpsPage.enterContactSearch('queenie');
    await expect(
      followUpsPage.getContactsTable().getRowNameValue(
        followUpsPage.getContactsTable().getContacts().first()
      )
    ).toContain('Queenie Quinn');
    await followUpsPage.getContactsTable().clickEmailButton(
      followUpsPage.getContactsTable().getContacts().get(0)
    );
    await expect(createEmailPage.isVisible()).toBeTruthy();
    await expect(createEmailPage.header.getText()).toContain('E-mail');
    await expect(createEmailPage.templateTypeDropDown.getText()).toContain(
      'SPONSOR_ME'
    );
    await createEmailPage.clickSendEmailButton();
    await snackbarCO.waitforSnackBar();
    await expect(snackbarCO.messageContainer.getText()).toContain('Email sent to 1 contact(s)');
    await snackbarCO.closeSnackBar();
  });
});
