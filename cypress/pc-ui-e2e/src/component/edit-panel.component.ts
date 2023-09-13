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
  previewTitle: any
  previewGoal: any
  previewStory: any

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
    this.previewTitle = '.page-preview-title'
    this.previewGoal = '.rs-preview__header .info .value'
    this.previewStory = '.container .user-content'
  }


  getKendoEditor(){
    const getIframeDocument = () => {
      return cy
      .get('iframe[class="k-content"]')       
      .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
      return getIframeDocument()
      .its('body').should('not.be.undefined')
      .then(cy.wrap)
    }

    return getIframeBody();
  }

  getPreviewIFrame() {
    const getIframeDocument = () => {
      return cy
      .get('iframe[class="preview-team__preview"]')       
      .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
      return getIframeDocument()
      .its('body').should('not.be.undefined')
      .then(cy.wrap)
    }

    return getIframeBody();
  }

  verifyPreviewTitle(value){
    this.getPreviewIFrame().within(() => {
      cy.get(this.previewTitle).should('contain.text', value)
    })    
  }

  verifyPreviewGoal(value){
    this.getPreviewIFrame().within(() => {
      cy.get(this.previewGoal).invoke('text').then(value => value.replace(/\$|\.\d{2}|,/g, ''))
      .then(t => expect(t).to.eq(value))
    }) 
  }

  verifyPreviewStory(value){
    this.getPreviewIFrame().within(() => {
      cy.get(this.previewStory).should('contain.text', value)
    }) 
  }

  
  clickSaveButton() {
    cy.get(this.saveButton).click()
    // return browser.actions().mouseMove(this.saveButton)
    //   .click().perform();
  }

  clickCancelButton(){
    cy.get(this.cancelButton).click()
    // return browser.actions().mouseMove(this.cancelButton)
    //   .click().perform();
  }

  isPresent(){
    cy.get(this.container).should('exist')
    // return this.container.isPresent();
  }

  // waitForDrawerToClose(timeout: number = 1000): Promise<any> {
  //   return browser.wait(
  //     ExpectedConditions.invisibilityOf(this.container),
  //     timeout
  //   );
  // }

  isVisible(){
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

  enterMyStory(input: string){
    cy.get(this.myStory).click().type(input)

    // return await typeIntoKendoEditor(this.myStory, input);
  }
  
}
