import { clearInputWithBackspace, buildSelector} from '../utils/actions';

export class EditPanel {
  readonly container: any;
  readonly pageTitle: any;
  readonly teamName: any;
  readonly pageUrl: any;
  readonly password: any;
  readonly pageFundraisingGoal: any;
  readonly editPanelActionsContainer: any;
  readonly saveButton: any;
  readonly cancelButton: any;
  readonly myStory: any;

  constructor() {
    this.container = buildSelector('.edit-panel');
    this.pageTitle = buildSelector(this.container,'.edit-page-title .mat-input-element');
    this.teamName = buildSelector(this.container,'.edit-team-name .mat-input-element');
    this.pageUrl = buildSelector(this.container,'.edit-page-custom-part .mat-input-element');
    this.password = buildSelector(this.container,'.edit-team-password .mat-input-element');
    this.pageFundraisingGoal = buildSelector(this.container,'.edit-page-fundraising-goal .mat-input-element');
    this.editPanelActionsContainer = buildSelector(this.container,'.edit-panel__actions');
    this.saveButton = buildSelector(this.editPanelActionsContainer,'#save');
    this.cancelButton = buildSelector(this.editPanelActionsContainer,'#cancel');
    this.myStory = buildSelector(this.container, '.text-editor .k-editable-area .k-content:nth-child(1)') ;
  }
  async clickSaveButton(): Promise<void> {
    cy.get(this.saveButton).click()
    // return browser.actions().mouseMove(this.saveButton)
    //   .click().perform();
  }

  async clickCancelButton(): Promise<void> {
    cy.get(this.cancelButton).click()
    // return browser.actions().mouseMove(this.cancelButton)
    //   .click().perform();
  }

  async isPresent(){
    cy.get(this.container).should('exist')
    // return this.container.isPresent();
  }

  // async waitForDrawerToClose(timeout: number = 1000): Promise<any> {
  //   return browser.wait(
  //     ExpectedConditions.invisibilityOf(this.container),
  //     timeout
  //   );
  // }

  async isVisible(){
    cy.get(this.container).should('be.visible')
    // scrollElemFinderIntoView(this.container);
    // return this.container.isDisplayed();
  }

  enterPageTitle(input: string){
    cy.get(this.pageTitle).clear().type(input)
    // clearInputWithBackspace(this.pageTitle);
    // return this.pageTitle.sendKeys(input);
  }

  enterPageUrl(input: string) {
    cy.get(this.pageUrl).clear().type(input)

    // clearInputWithBackspace(this.pageUrl);
    // return this.pageUrl.sendKeys(input);
  }

  enterPageFundraisingGoal(input: string) {
    cy.get(this.pageFundraisingGoal).clear().type(input)

    // clearInputWithBackspace(this.pageFundraisingGoal);
    // return this.pageFundraisingGoal.sendKeys(input);
  }

  async enterMyStory(input: string): Promise<void> {
    cy.get(this.myStory).click().type(input)

    // return await typeIntoKendoEditor(this.myStory, input);
  }

  async getMyStory() {
    cy.get(this.myStory)

    //return await getKendoEditorContent(this.myStory);
  }

  async getPageFundraisingGoal(value) {
    cy.get(this.pageFundraisingGoal).should('contain.text', value)
    // return this.pageFundraisingGoal.getAttribute('value');
  }
  async getPageUrl(value) {
    cy.get(this.pageUrl).should('contain.text', value)

    // return this.pageUrl.getAttribute('value');
  }
  async getPageTitle(value) {
    cy.get(this.pageTitle).should('contain.text', value)

    // return this.pageTitle.getAttribute('value');
  }
}
