import { EditPanel } from '../component/edit-panel.component';
import { PagePreview } from '../component/page-preview.component';
import {  selectDropDownOption, elementByClass, elementById,} from '../utils/actions';

export class MyPage {
  container: any;
  header: any;
  importSection: any;
  importDropDown: any;
  saveButton: any;
  cancelButton: any;
  editButton: any;
  customizeContainer: any;
  editpanel: EditPanel;
  pagePreview: PagePreview;

  constructor() {
    this.container = elementByClass('.my-page');
    this.header = this.container.$('.page-header');
    this.importSection = this.container.$('.my-page__import');
    this.importDropDown = this.importSection.$('.mat-select');
    this.saveButton = elementByClass('.btn-save');
    this.cancelButton = this.importSection.$('.cancel');
    this.customizeContainer = this.container.$('.my-page__customize');
    this.editButton = this.container.$('.my-page-edit-overlay');
    this.editpanel = new EditPanel();
    this.pagePreview = new PagePreview();
  }

  async clickSaveButton(): Promise<void> {
    cy.get(this.saveButton).click()
    //  return browser.actions().mouseMove(this.saveButton)
    //  .click().perform();
  }
  
  async clickCancelButton(): Promise<void> {
    cy.get(this.cancelButton).click()

    // return browser.actions().mouseMove(this.cancelButton)
    //   .click().perform();
  }

  async clickEditButton(): Promise<void> {
    cy.get(this.editButton).click()

    // return browser.actions().mouseMove(this.editButton)
    //   .click().perform();
  }

  async selectEvent(type: string): Promise<void> {
    // scrollElemFinderIntoView(this.importDropDown);
    selectDropDownOption(this.importDropDown, type);
  }

  async isVisible() {
    // scrollElemFinderIntoView(this.container);
    cy.get(this.container).should('be.visible')
    // return this.container.isDisplayed();
  }

  async switchToPreview(): Promise<void> {
    // scrollElemFinderIntoView(elementById('participant-page-preview'));
    cy.get('participant-page-preview')
    // await switchToIFrame(elementById('participant-page-preview'));
  }

  // async switchToMainWindow(): Promise<void> {
  //   return switchToMainWindow();
  // }

  async enterMyStory(input: string): Promise<void> {
    // scrollElemFinderIntoView(this.editpanel.container);
    cy.get(this.editpanel.myStory).type(input)
    // return await typeIntoKendoEditor(this.editpanel.myStory, input);
  }

  async enterPageTitle(input: string): Promise<void> {
    // scrollElemFinderIntoView(this.editpanel.pageTitle);
    this.editpanel.enterPageTitle(input);
  }

  async enterPageUrl(input: string): Promise<void> {
    // scrollElemFinderIntoView(this.editpanel.pageUrl);
    this.editpanel.enterPageUrl(input);
  }

  async enterPageFundraisingGoal(input: string): Promise<void> {
    // scrollElemFinderIntoView(this.editpanel.pageFundraisingGoal);
    this.editpanel.enterPageFundraisingGoal(input);
  }

  async getMyStory() {
    // scrollElemFinderIntoView(this.editpanel.myStory);
    this.editpanel.getMyStory();
  }

  async getPageTitle() {
    // scrollElemFinderIntoView(this.editpanel.pageTitle);
    this.editpanel.getPageTitle();
  }

  async getPageUrl() {
    // scrollElemFinderIntoView(this.editpanel.pageUrl);
    this.editpanel.getPageUrl();
  }

  async getPageFundraisingGoal() {
    // scrollElemFinderIntoView(this.editpanel.pageFundraisingGoal);
    this.editpanel.getPageFundraisingGoal();
  }
}
