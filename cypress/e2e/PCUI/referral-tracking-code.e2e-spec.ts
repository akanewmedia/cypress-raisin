import { TrackingCodeComponent } from '../../pc-ui-e2e/src/component/tracking-code.component';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { DashboardPage } from '../../pc-ui-e2e/src/page/dashboard.page';
import { userLogin, waitForElement } from '../../pc-ui-e2e/src/utils/actions';

const referralCode = 'flast109';

describe('TrackingCodeComponent tests:', () => {
  let dashboard: DashboardPage;
  let createEmailPage: CreateEmailPage;
  let trackingCodeComponent: TrackingCodeComponent;

  beforeAll(() => {
    dashboard = new DashboardPage();
    createEmailPage = new CreateEmailPage();
    trackingCodeComponent = new TrackingCodeComponent();
  });

  it('should log in', async () => {
    await userLogin('TcCrisHeaderOneTestOne');
  });

  it('should verify dashboard is visible', async () => {
    await expect(dashboard.isVisible()).toBeTruthy();
  });

  it('should have tracking code component', async () => {
    await waitForElement(trackingCodeComponent.container);
    await expect(trackingCodeComponent.container.isPresent()).toBeTruthy();
  });

  it('should have dialog with referralCode', async () => {
    await trackingCodeComponent.shareCodeBtn.click();
    await waitForElement(trackingCodeComponent.dialog);
    await expect(trackingCodeComponent.dialog.getText()).toContain(referralCode);
  });

  it('should go to email page', async () => {
    await trackingCodeComponent.sendEmailFriends();
    await waitForElement(createEmailPage.container);
    await expect(createEmailPage.container.isPresent()).toBeTruthy();
  });
});
