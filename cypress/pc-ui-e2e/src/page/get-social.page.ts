import { buildSelector, scrollToElement } from '../utils/actions';

export class GetSocialPage {
  container: any;
  header: any;
  pageTipContent: any;
  pageTipHeader: any;
  socialStep1: any;
  socialHint1: any;
  socialStep2: any;
  socialHint2: any;
  socialFilter: any;
  socialFilterLabel: any;
  socialMsgTone: any;
  socialMsgCard: any;
  socialPostEditorText: any;
  socialShare: any;

  constructor() {
    this.container = buildSelector('pc-social-posts-page');
    this.header = buildSelector('.page-header h1');
    this.pageTipHeader = buildSelector('.page-tip__heading')
    this.pageTipContent = buildSelector('.page-tip__content div');
    this.socialStep1 = buildSelector('.social-step h2')
    this.socialHint1 = buildSelector('.social-hint:first')
    this.socialStep2 = buildSelector('.social-step__step2')
    this.socialHint2 = buildSelector('.social-step__step2hint')
    this.socialFilter = buildSelector('.social-filter')
    this.socialFilterLabel = buildSelector('.mdc-button__label')
    this.socialMsgTone = buildSelector('.social-msg__tone')
    this.socialMsgCard = buildSelector('.social-msg')
    this.socialPostEditorText = buildSelector('#social-post-editor-txt')
    this.socialShare = buildSelector('.social-share')
  }

  isVisible() {
    scrollToElement(this.container);
    cy.get(this.container).should('be.visible');
  }

  /**
   * Presses the "Escape" (Esc) keyboard button
   */
  pressEsc() {
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.wait(500);
    cy.get('body').trigger('keyup', { keyCode: 27 });
  }

  verifySocialFilterLabels() {
    cy.get(this.socialFilter)
      .find(this.socialFilterLabel)
      .should('have.length', 7)

    const expected = [
      'Inspiration Mix',
      'Join Event',
      'Awareness',
      'Progress',
      'Gratitude',
      'Personal To Me',
      'Impact Story'
    ]

    cy.get(this.socialFilter)
      .find(this.socialFilterLabel)
      .each(($label, idx) => {
        cy.wrap($label)
          .invoke('text')
          .should('contain', expected[idx])
      })
  }
}
