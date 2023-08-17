import { buildSelector, elementByClass, elementsByClass } from '../utils/actions';

export class DashboardPage {
  container: any;
  completeProfileComponent: any;
  activityFeedWidget: any;
  activityFeedLoadMoreButton: any;
  activityFeedRows: any;
  todoWidget: any;
  progressTabs: any;
  // personalProgressButton: any;
  // teamProgressButton: any;
  progressGoal: any;
  todoRows: any;
  topTeamMembersWidget: any;
  topTeamMembersTeamProgressButton: any;
  tabLabels: any;

  constructor() {
    this.container = buildSelector('.dashboard-page');
    this.completeProfileComponent = buildSelector(this.container,'.complete-profile');
    this.activityFeedWidget = buildSelector(this.container,'pc-activity-feed');
    this.activityFeedLoadMoreButton = buildSelector(this.activityFeedWidget, '.mat-flat-button');
    this.activityFeedRows = buildSelector(this.activityFeedWidget, '.activity-feed__list li.ng-star-inserted');
    this.todoWidget = buildSelector(this.container,'pc-to-do-list');
    this.todoRows = buildSelector(this.todoWidget,'.to-do-list li.ng-star-inserted');
    this.progressTabs = buildSelector('.progress-tabs');
    this.tabLabels = buildSelector('.mat-tab-label');
    // this.personalProgressButton = elementsByClass('.mat-tab-label', this.progressTabHeader).get(0);
    // this.teamProgressButton = elementsByClass('.mat-tab-label', this.progressTabHeader).get(1);
    this.progressGoal = buildSelector(this.progressTabs, '.goal-title');
    this.topTeamMembersWidget = buildSelector(this.container, '.top-team-members');
    this.topTeamMembersTeamProgressButton = buildSelector(this.topTeamMembersWidget,'.mat-flat-button');
  }

  async isVisible(){
    // scrollElemFinderIntoView(this.container);
    cy.get(this.container).should('be.visible')
    // return this.container.isDisplayed();
  }

  async clickActivityFeedLoadMoreButton(): Promise<void> {
    // scrollElemFinderIntoView(this.activityFeedLoadMoreButton);
    cy.get(this.activityFeedLoadMoreButton).click();
  }
  async clickPersonalProgressButton(): Promise<void> {
    // scrollElemFinderIntoView(this.tabLabels.get(0));
    cy.get(this.tabLabels).eq(0).click();
  }
  async clickTeamProgressButton(): Promise<void> {
    // scrollElemFinderIntoView(this.tabLabels.get(1));
    cy.get(this.tabLabels).eq(1).click();
  }

  async clickTopTeamMembersTeamProgressButton(): Promise<void> {
    // scrollElemFinderIntoView(this.topTeamMembersTeamProgressButton);
    cy.get(this.topTeamMembersTeamProgressButton).click();
  }

  getActivityRows(): any {
    // scrollElemFinderIntoView(this.activityFeedRows.get(0));
    cy.get(this.activityFeedRows);
  }

  getTodoRows(): any {
    // scrollElemFinderIntoView(this.todoRows.get(0));
    cy.get(this.todoRows);
  }

  async getRowNameValue(row: any) {
    // scrollElemFinderIntoView(elementByClass('.activity__details', row));
    cy.get(row + '.activity__details')
    // return elementByClass('.activity__details', row).getText();
  }

  async getToDoRowNameValue(row: any) {
    // scrollElemFinderIntoView(elementByClass('.to-do-item', row));
    cy.get(row + '.to-do-item')

    // return elementByClass('.to-do-item', row).getText();
  }

  async clickRowActionButton(row: any): Promise<void> {
    // scrollElemFinderIntoView(elementByClass('.mat-stroked-button', row));
    cy.get(row + '.mat-stroked-button').click()

    // return elementByClass('.mat-stroked-button', row).click();
  }

  async getProgressGoalText() {
    // scrollElemFinderIntoView(this.progressGoal);
    cy.get(this.progressGoal);
  }
}
