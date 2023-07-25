import { EditPanel } from '../component/edit-panel.component';
import { PagePreview } from '../component/page-preview.component';
import {  selectDropDownOption, buildSelector,} from '../utils/actions';

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
  previewTitle:any
  previewGoal:any
  previewStory:any
  editContainer:any
  tributeFirstName:any
  tributeLastName:any
  widgetTitle:any

  constructor() {
    this.container = buildSelector('.my-page');
    this.editContainer = ('.edit-panel ')
    this.header = buildSelector(this.container , '.page-header');
    this.importSection = buildSelector(this.container, '.my-page__import');
    this.importDropDown = buildSelector(this.importSection, '.mat-select');
    this.saveButton = buildSelector('.btn-save');
    this.cancelButton = buildSelector(this.importSection, '.cancel');
    this.customizeContainer = buildSelector(this.container, '.my-page__customize');
    this.editButton = buildSelector('.preview-team__customize button');
    this.editpanel = new EditPanel();
    this.pagePreview = new PagePreview();
    this.previewTitle = '.page-preview-title'
    this.previewGoal = '.rs-preview__header .info .value'
    this.previewStory = '.container .user-content'
    this.tributeFirstName = '#tributeFirstName'
    this.tributeLastName = '#tributeLastName'
    this.widgetTitle = '.thermometer-container--animated .title'
  }

  clickSaveButton() {
    cy.get(this.saveButton).click()
  }
  
  async clickCancelButton(): Promise<void> {
    cy.get(this.cancelButton).click()

    // return browser.actions().mouseMove(this.cancelButton)
    //   .click().perform();
  }

  async clickEditButton(): Promise<void> {
    cy.contains(this.editButton, "Edit Page").click()

    // return browser.actions().mouseMove(this.editButton)
    //   .click().perform();
  }

  selectWidgetSettings(value){
    this.populateFormField('#customThermometerTemplate', value, 'dropdown')
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
      .get('iframe[id="participant-page-preview"]')       
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

  verifyWidget(title){
    this.getPreviewIFrame().within(() => {
      if(title == 'hide'){
        cy.get(this.widgetTitle).should('not.exist')
      }
      else {
        cy.get(this.widgetTitle).first().should('have.text', title)
      }
    })    
  }

  verifyWidgetAttrGoal(title){
    this.getPreviewIFrame().within(() => {
      if(title == 'hide'){
        cy.get(this.widgetTitle).should('not.exist')
      }
      else {
        cy.get('[widget-thermometer]').first().invoke('attr', 'data-param-ttl_goal').should('contain', title)
      }
    })    
  }

  verifyWidgetAttrRaised(title){
    this.getPreviewIFrame().within(() => {
      if(title == 'hide'){
        cy.get(this.widgetTitle).should('not.exist')
      }
      else {
        cy.get('[widget-thermometer]').first().invoke('attr', 'data-param-ttl_achieved').should('contain', title)
      }
    })    
  }

  populateFormField(element: any, value: any, fieldType: string = 'textbox') {
    // waitForElement(element);
    // scrollElemFinderIntoView(element);
    if (fieldType === 'dropdown') {
      selectDropDownOption(element, `${value}`);
    } else if (fieldType === 'textbox') {
      ///clearInputWithBackspace(element);
      cy.get(element).clear().type(`${value}`);
    }
  }

  verifyTributeRequiredFieldErrors(data) {
    const getTexts = ($errors) => {
      return Cypress._.map($errors, 'innerText')
    }
    cy.get(this.editContainer + '.mat-error').should('exist').then(getTexts).should('deep.equal', data)
  }

  selectDate(element: any){
    cy.get(element).click().then(()=>{
      cy.get('.mat-calendar-table .mat-calendar-body-today').click()
    })
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
    cy.get('#participant-page-preview')
    // await switchToIFrame(elementById('participant-page-preview'));
  }

  // async switchToMainWindow(): Promise<void> {
  //   return switchToMainWindow();
  // }

  enterMyStory(input: string) {
    // scrollElemFinderIntoView(this.editpanel.container);
    cy.get(this.editpanel.myStory).click().type(input)
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
}
