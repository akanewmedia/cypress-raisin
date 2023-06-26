import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { MyPage } from '../../pc-ui-e2e/src/page/my-page.page';
import {
  scrollToElement,
  getKendoEditorContent,
  userLogin,
} from '../../pc-ui-e2e/src/utils/actions';
import { browser } from 'protractor';

describe('edit my page', () => {
  let sidebar: Sidebar;
  let myPagePO: MyPage;

  beforeAll(() => {
    sidebar = new Sidebar();
    myPagePO = new MyPage();
  });

  it('should log in', () => {
    userLogin('DaveHeaderOneTestOne');
  });

  it('should go to my page', () => {
    sidebar.clickMyPageLink();
    expect(myPagePO.isVisible()).toBeTruthy();
    expect(myPagePO.header.getText()).toContain('My Page');
  });

  it('should open edit panel on edit my page', async() => {
    // browser.sleep(1000);
    myPagePO.clickEditButton();

    myPagePO.enterPageTitle('new title');
    myPagePO.enterPageUrl('newurl');
     myPagePO.enterPageFundraisingGoal('1234');

    expect(myPagePO.getPageTitle()).toContain(
      'new title'
    );
    expect(myPagePO.getPageUrl()).toContain(
      'newurl'
    );
    expect(
      myPagePO.getPageFundraisingGoal()
    ).toContain('1234');
    myPagePO.clickSaveButton();
    myPagePO.editpanel.waitForDrawerToClose();

  });
//  //todo: WN-fix protractor to pickup kendo editor
//   xit('should enter text into the my story field then save and close panel', () => {
//     const storyText = 'My Story';
//     myPagePO.enterMyStory(storyText);
//     myPagePO.switchToMainWindow();
//     expect(myPagePO.getMyStory()).toEqual(storyText);   
// expect(myPagePO.editpanel.isVisible()).toEqual(false)
//   });

  it('should verify page preview is updated', async () => {
    await myPagePO.switchToPreview();
    await expect(myPagePO.pagePreview.getPageTitle()).toEqual('new title');
    //expect(myPagePO.getMyStory()).toEqual('My Story');
  });

  it('should open edit panel and validate page title', () => {
    myPagePO.switchToMainWindow();
    myPagePO.clickEditButton();
    expect(myPagePO.editpanel.isPresent()).toBeTruthy();
    expect(myPagePO.getPageTitle()).toEqual('new title');
    expect(myPagePO.getPageFundraisingGoal()).toEqual('1234');
  });


  it('should validate my story', async () => {
    await expect(myPagePO.getMyStory()).toContain('Support My Journey');
    await myPagePO.clickSaveButton();
    await myPagePO.editpanel.waitForDrawerToClose();
    await browser.sleep(1000);
    await myPagePO.selectEvent('rxfmptest');
    await myPagePO.switchToPreview();
    await browser.sleep(1000);
    await expect(myPagePO.pagePreview.getPageTitle()).toContain('20203');
    await browser.sleep(5000);
    await myPagePO.switchToMainWindow();
    await myPagePO.clickCancelButton();
    await myPagePO.switchToPreview();

    await expect(myPagePO.pagePreview.getPageTitle()).toContain('new title');
    await expect(myPagePO.pagePreview.getMyStory()).toContain('sponsor me and help make a difference');

    await myPagePO.switchToMainWindow();
    await myPagePO.selectEvent('copiedeventgrptest');
    await myPagePO.clickSaveButton();
    await myPagePO.switchToPreview();

    await expect(myPagePO.pagePreview.getPageTitle()).toContain('20234');
  });
});
