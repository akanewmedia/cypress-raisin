import { buildSelector, clickLink } from '../utils/actions';

export class Sidebar {
  container: any;
  private sidebarExpandButton: any;
  private sidebarCompressButton: any;
  private dashboardPanel: any;
  private dashboardLink: any;
  private myPagePanel: any;
  private myPageLink: any;
  private teamPanel: any;
  private teamLink: any;
  private teamExpandLink: any;
  private teamPageLink: any;
  private teamProgressLink: any;
  private donationsPanel: any;
  private donationsLink: any;
  private donationsHistoryLink: any;
  private offlineDonationsLink: any;
  private selfDonationLink: any;
  private followUpsPanel: any;
  private followUpsLink: any;
  private emailsPanel: any;
  private emailsLink: any;
  private createEmailLink: any;
  private myContactsLink: any;

  constructor() {
    this.container = buildSelector('.side-nav__panel');
    this.sidebarExpandButton = buildSelector('button.collapse-nav.collapsed');
    this.sidebarCompressButton = buildSelector('button.collapse-nav.expanded');
    this.dashboardPanel = buildSelector(this.container,'.dashboard-panel');
    this.dashboardLink = buildSelector(this.container,'.dashboard-link');
    this.myPagePanel = buildSelector(this.container, '.my-page-panel');
    this.myPageLink = buildSelector(this.container, '[data-target="sidenav-item-my-page-desktop"]');
    this.teamPanel = buildSelector(this.container, '.team-panel');
    this.teamLink = buildSelector(this.container,'.team-link');
    this.teamExpandLink = buildSelector(this.teamPanel, '.mat-icon.expand-icon');
    this.teamPageLink = buildSelector(this.container,'.team-page-link');
    this.teamProgressLink = buildSelector(this.container,'.team-progress-link');
    this.donationsPanel = buildSelector(this.container,'.donations-panel');
    this.donationsLink = buildSelector(this.container,'.donations-link');
    this.donationsHistoryLink = buildSelector(this.container,'.donations-history-link');
    this.offlineDonationsLink = buildSelector(this.container,'.offline-donations-link');
    this.selfDonationLink = buildSelector(this.container,'.self-donation-link');
    this.followUpsPanel = buildSelector(this.container,'.follow-ups-panel');
    this.followUpsLink = buildSelector(this.container,'.follow-ups-link');
    this.emailsPanel = buildSelector(this.container,'.emails-panel');
    this.emailsLink = buildSelector(this.container,'.send-emails-link');
    this.createEmailLink = buildSelector(this.container,'.create-email-link');
    this.myContactsLink = buildSelector(this.container,'.my-contacts-link');
  }

  

  async expandSidebar(): Promise<void> {
    //return this.sidebarExpandButton.click();
    clickLink(this.sidebarExpandButton)
  }

  async compressSidebar(): Promise<void> {
    clickLink(this.sidebarCompressButton)
    //return this.sidebarCompressButton.click();
  }

  async expandPanel(expandablePanel: any): Promise<void> {
    clickLink(expandablePanel + '.expand-icon')

    //return expandablePanel.$('.expand-icon').click();
  }

  async closePanel(expandablePanel: any): Promise<void> {
    clickLink(expandablePanel + '.compress-icon')

    //return expandablePanel.$('.compress-icon').click();
  }

  async expandDonationsPanel(): Promise<void> {
    //this.clickLink(this.donationsPanel)
    return this.expandPanel(this.donationsPanel);
  }

  async closeDonationsPanel(): Promise<void> {
    //this.clickLink(this.donationsPanel)

    return this.closePanel(this.donationsPanel);
  }
  async expandTeamPanel(): Promise<void> {
    //this.clickLink(this.teamPanel)
    return this.expandPanel(this.teamPanel);
  }
  async closeTeamPanel(): Promise<void> {
    //this.clickLink(this.teamPanel)
    return this.closePanel(this.teamPanel);
  }
  async clickMyPageLink(): Promise<void> {
    // return browser.actions().mouseMove(this.myPageLink)
    //   .click().perform();
    clickLink(this.myPageLink)
  }

  async clickTeamLink(): Promise<void> {
    // return browser.actions().mouseMove(this.teamLink)
    //   .click().perform();
    clickLink(this.teamLink)
  }
  async clickTeamExpandLink(): Promise<void> {
    clickLink(this.teamExpandLink)
    // return browser.actions().mouseMove(this.teamExpandLink)
    //   .click().perform();
  }
  async clickTeamPageLink(): Promise<void> {
    clickLink(this.teamPageLink)
    // return browser.actions().mouseMove(this.teamPageLink)
    //   .click().perform();
  }

  async clickDashboardLink(): Promise<void> {
    clickLink(this.dashboardLink)
    // return browser.actions().mouseMove(this.dashboardLink)
    //   .click().perform();
  }

  async clickTeamProgressPageLink(): Promise<void> {
    clickLink(this.teamProgressLink)
    // return browser.actions().mouseMove(this.teamProgressLink)
    //   .click().perform();
  }

  async clickEmailPanel(): Promise<void> {
    clickLink(this.emailsPanel)
    // return browser.actions().mouseMove(this.emailsPanel)
    //   .click().perform();
  }
  async clickEmailLink(): Promise<void> {
    clickLink(this.emailsLink)
    // return browser.actions().mouseMove(this.emailsLink)
    //   .click().perform();
  }
  async clickCreateEmailLink(): Promise<void> {
    clickLink(this.createEmailLink)
    // return browser.actions().mouseMove(this.createEmailLink)
    //   .click().perform();
  }
  async clickMyContactsLink(): Promise<void> {
    clickLink(this.myContactsLink)
    // return browser.actions().mouseMove(this.myContactsLink)
    //   .click().perform();
  }
  async clickDonationsLink(): Promise<void> {
    clickLink(this.donationsLink)
    // return browser.actions().mouseMove(this.donationsLink)
    //   .click().perform();
  }
  async clickFollowUpsLink(): Promise<void> {
    clickLink(this.followUpsLink)
    // return browser.actions().mouseMove(this.followUpsLink)
    //   .click().perform();
  }
  async clickDonationsHistoryLink(): Promise<void> {
    clickLink(this.donationsHistoryLink)
    // return browser.actions().mouseMove(this.donationsHistoryLink)
    //   .click().perform();
  }
  async clickOfflineDonationsLink(): Promise<void> {
    clickLink(this.offlineDonationsLink)
    // scrollElemFinderIntoView(this.offlineDonationsLink);
    // return this.offlineDonationsLink.click();
  }
}
