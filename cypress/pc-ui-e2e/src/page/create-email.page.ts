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
    this.templateTypeDropDown = buildSelector(this.container + '.mat-mdc-select');
    this.previewButton = buildSelector('.preview-button');
    this.saveAsButton = buildSelector('.save-as-button');
    this.saveButton = buildSelector('.save-button');
    this.sendButton = buildSelector('.send-button');
    this.addReceipientsButton = buildSelector('.add-recipients-button');
    this.orgMsg = buildSelector('.show-org-message .ng-star-inserted');
    this.viewOrgMsgButton = buildSelector('.show-org-message button');
    this.sendToField = buildSelector('.recipient-list .ng-input input');
    this.subjectField = buildSelector('.subject .mat-mdc-input-element');
    this.messageField = buildSelector('.message');
    this.saveTemplateOverlay = buildSelector('.cdk-overlay-container');
    this.saveTemplateNameField = buildSelector('pc-save-template .input-wrap .mat-mdc-input-element');
    this.saveTemplateSaveButton = buildSelector('Save');
    this.addRecipientsPopup = new AddRecipientsPopup();
  }

  isVisible() {
    scrollToElement(this.container);
    cy.get(this.container).should('be.visible');
  }

  clickSaveButton() {
    scrollToElement(this.saveButton);
    cy.get(this.saveButton).click();
  }

  clickAddReceipentsButton() {
    cy.get(this.addReceipientsButton).click({force: true});
  }

  clickSaveAsButton() {
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
  pressEsc() {
      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy.wait(500);
      cy.get('body').trigger('keyup', { keyCode: 27 });
    }  

  clickSaveTemplateSaveButton() {
    scrollToElement(this.saveTemplateSaveButton);
    cy.get(this.saveTemplateSaveButton).click();
  }

  scrollToSendEmailButton() {
    return scrollToElement(this.sendButton);
  }

  clickSendEmailButton() {
    scrollToElement(this.sendButton);
    cy.get(this.sendButton).click();
  }

  selectType(type: string) {
    scrollToElement(this.templateTypeDropDown);
    selectMatDropDownOption(this.templateTypeDropDown, type);
  }

  enterSubject(input: string) {
    cy.get(this.subjectField).clear().type(input);
  }

  enterSendTo(input: string) {
    cy.get(this.sendToField).clear().type(input);
  }

  enterTemplateName(input: string) {
    cy.get(this.saveTemplateNameField).clear().type(input);
    cy.get('pc-save-template').within(()=>{
      cy.contains('button', "Save").click()
    })
  }

  enterMessage(input: string) {
    cy.get(this.messageField).click();
    //return await typeIntoKendoEditor(this.messageField, input);
  }
}
