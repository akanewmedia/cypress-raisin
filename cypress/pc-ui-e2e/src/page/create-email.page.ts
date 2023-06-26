import { AddRecipientsPopup } from '../component/add-recipients-popup';
import { buildSelector, clearInputWithBackspace, scrollToElement,  selectDropDownOption, selectMatDropDownOption } from '../utils/actions';

export class CreateEmailPage {
  container: any;
  header: any;
  templateTypeDropDown: any;
  previewButton: any;
  saveAsButton: any;
  saveButton: any;
  sendButton: any;
  addReceipientsButton: any;
  orgMsg: any;
  viewOrgMsgButton: any;
  sendToField: any;
  subjectField: any;
  messageField: any;
  saveTemplateOverlay: any;
  saveTemplateNameField: any;
  saveTemplateSaveButton: any;
  addRecipientsPopup: AddRecipientsPopup;

  constructor() {
    this.container = buildSelector('.create-email-container ');
    this.header = buildSelector('.page-header h1');
    this.templateTypeDropDown = buildSelector(this.container + '.mat-select');
    this.previewButton = buildSelector('.preview-button');
    this.saveAsButton = buildSelector('.save-as-button');
    this.saveButton = buildSelector('.save-button');
    this.sendButton = buildSelector('.send-button');
    this.addReceipientsButton = buildSelector('.add-recipients-button');
    this.orgMsg = buildSelector('.show-org-message .ng-star-inserted');
    this.viewOrgMsgButton = buildSelector('.show-org-message button');
    this.sendToField = buildSelector('.recipient-list .ng-input input');
    this.subjectField = buildSelector('.subject .mat-input-element');
    this.messageField = buildSelector('.message');
    this.saveTemplateOverlay = buildSelector('.cdk-overlay-container');
    this.saveTemplateNameField = buildSelector('.input-wrap .mat-input-element');
    this.saveTemplateSaveButton = buildSelector('Save');
    this.addRecipientsPopup = new AddRecipientsPopup();
  }

  async isVisible() {
    scrollToElement(this.container);
    cy.get(this.container).should('be.visible');
  }

  async clickSaveButton(): Promise<void> {
    scrollToElement(this.saveButton);
    cy.get(this.saveButton).click();
  }

  async clickAddReceipentsButton(): Promise<void> {
    cy.get(this.addReceipientsButton).click();
  }

  async clickSaveAsButton(): Promise<void> {
    scrollToElement(this.saveAsButton);
    cy.get(this.saveAsButton).click();
  }
  clickOrgMsgButton() {
    scrollToElement(this.viewOrgMsgButton);
    cy.get(this.viewOrgMsgButton).click();
  }

  /**
   * Presses the "Escape" (Esc) keyboard button
   */
  async pressEsc() {
      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy.wait(500);
      cy.get('body').trigger('keyup', { keyCode: 27 });
    }  

  async clickSaveTemplateSaveButton(): Promise<void> {
    scrollToElement(this.saveTemplateSaveButton);
    cy.get(this.saveTemplateSaveButton).click();
  }

  async scrollToSendEmailButton() {
    return scrollToElement(this.sendButton);
  }

  async clickSendEmailButton(): Promise<void> {
    scrollToElement(this.sendButton);
    cy.get(this.sendButton).click();
  }

  selectType(type: string) {
    scrollToElement(this.templateTypeDropDown);
    selectMatDropDownOption(this.templateTypeDropDown, type);
  }

  async enterSubject(input: string) {
    clearInputWithBackspace(this.subjectField);
    cy.get(this.subjectField).type(input);
  }

  async enterSendTo(input: string): Promise<void> {
    cy.get(this.sendToField).type(input);
    cy.get(this.sendToField).type('Cypress.io{enter}')
  }

  async enterTemplateName(input: string): Promise<void> {
    scrollToElement(this.saveTemplateNameField);
    cy.get(this.saveTemplateNameField).clear().type(input);
  }

  async enterMessage(input: string): Promise<void> {
    cy.get(this.messageField).click();
    //return await typeIntoKendoEditor(this.messageField, input);
  }
}
