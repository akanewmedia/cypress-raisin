import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { scrollElemFinderIntoView, userLogin, waitForElement, waitForRipple } from '../../pc-ui-e2e/src/utils/actions';
import { DashboardPage } from '../../pc-ui-e2e/src/page/dashboard.page';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { FollowUpsPage } from '../../pc-ui-e2e/src/page/follow-ups.page';
import { MyPage } from '../../pc-ui-e2e/src/page/my-page.page';
import { TeamProgressPage } from '../../pc-ui-e2e/src/page/team-progress.page';
import { browser } from 'protractor';

describe('dashboard tests:', () => {
  let sidebar: Sidebar;
  let dashboard: DashboardPage;
  let createEmailPage: CreateEmailPage;
  let followUpsPage: FollowUpsPage;
  let myPagePO: MyPage;
  let teamProgressPage: TeamProgressPage;

  beforeAll(() => {
    sidebar = new Sidebar();
    dashboard = new DashboardPage();
    createEmailPage = new CreateEmailPage();
    followUpsPage = new FollowUpsPage();
    myPagePO = new MyPage();
    teamProgressPage = new TeamProgressPage();
  });

  it('should log in', async () => {
    await userLogin('TcCrisHeaderOneTestOne');
  });

  it('should verify dashboard is visible', () => {
    dashboard.isVisible();
  });

  it('find activity feed type with no actions', () => {
    const activityFeed = dashboard.getActivityRows();
    expect(dashboard.getRowNameValue(activityFeed.get(0))).toContain(
      'Updated images/video of the team'
    );
    expect(dashboard.getRowNameValue(activityFeed.get(1))).toContain(
      'Updated story of the team'
    );
    dashboard.clickActivityFeedLoadMoreButton();
    expect(dashboard.getRowNameValue(activityFeed.get(5))).toContain(
      'Emailed 1 contacts'
    );
    expect(dashboard.getRowNameValue(activityFeed.get(6))).toContain(
      'Updated story'
    );
    expect(dashboard.getRowNameValue(activityFeed.get(7))).toContain(
      'Updated images/video'
    );
  });

  it('find contract that has visited your page and click follow up', () => {
    const activityFeed = dashboard.getActivityRows();
    expect(dashboard.getRowNameValue(activityFeed.get(2))).toContain(
      'Peter Parker has visited your page'
    );
    dashboard.clickRowActionButton(activityFeed.get(2));
    waitForElement(createEmailPage.container).then(() => {
      expect(createEmailPage.container.isPresent()).toBeTruthy();
    });

    expect(createEmailPage.header.getText()).toContain('E-mail');
    expect(createEmailPage.templateTypeDropDown.getText()).toContain(
      'FOLLOW_UP'
    );
  });

  it('go back to dashboard and find contact with response', () => {
    sidebar.clickDashboardLink();
    const activityFeed = dashboard.getActivityRows();
    expect(dashboard.getRowNameValue(activityFeed.get(4))).toContain(
      'Sent follow-up email to 1 contacts Andrew'
    );
    dashboard.clickRowActionButton(activityFeed.get(4));
    expect(followUpsPage.container.isPresent()).toBeTruthy();
    expect(followUpsPage.header.getText()).toContain('Follow Ups');
  });

  it('go back to dashboard and click 3 times load more', () => {
    sidebar.clickDashboardLink();
    dashboard.clickActivityFeedLoadMoreButton();
    dashboard.clickActivityFeedLoadMoreButton();
    dashboard.clickActivityFeedLoadMoreButton();
    const activityFeed = dashboard.getActivityRows();
    expect(dashboard.getRowNameValue(activityFeed.get(16))).toContain(
      'donated $50'
    );
    expect(dashboard.getRowNameValue(activityFeed.get(18))).toContain(
      'You made a self-donation of $10'
    );
    expect(dashboard.getRowNameValue(activityFeed.get(19))).toContain(
      'Registered today'
    );

    // Button was removed from this action
    // dashboard.clickRowActionButton(activityFeed.get(16));
    // browser.sleep(5000);
    // expect(createEmailPage.header.getText()).toContain('E-mail');
    // expect(createEmailPage.templateTypeDropDown.getText()).toContain(
    //   'THANK_YOU'
    // );
    // expect(createEmailPage.subjectField.getAttribute('value')).toContain(
    //   'Test Subject 4'
    // );
  });

  it('go back to dashboard and check if my page todo is there', () => {
    sidebar.clickDashboardLink();
    const todoFeed = dashboard.getTodoRows();
    expect(dashboard.getToDoRowNameValue(todoFeed.get(0))).toContain(
      'Personalize your page'
    );
  });

  it('on dashboard click on my page todo item', () => {
    const todoFeed = dashboard.getTodoRows();
    dashboard.clickRowActionButton(todoFeed.get(0));
    waitForElement(myPagePO.container).then(() => {
      expect(myPagePO.container.isPresent()).toBeTruthy();
      expect(myPagePO.header.getText()).toContain('My Page');
    });
  });

  it('go back to dashboard and switch between personal and team tabs', async () => {
    await sidebar.clickDashboardLink();
    await dashboard.clickTeamProgressButton();
    expect(dashboard.getProgressGoalText()).toContain('Team Goal');
    waitForRipple();
    await dashboard.clickPersonalProgressButton();
    expect(dashboard.getProgressGoalText()).toContain('Personal Goal');
  });

  it('click on team members progess button and goto team progress page', () => {
    sidebar.clickDashboardLink();
    dashboard.clickTopTeamMembersTeamProgressButton();
    expect(
      teamProgressPage.contactsListComponent.container.isPresent()
    ).toBeTruthy();
    expect(teamProgressPage.header.getText()).toContain('Team Progress');
  });
});
