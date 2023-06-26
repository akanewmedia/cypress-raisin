import { buildSelector } from "../utils/actions";

export class TrackingCodeComponent {
  container = buildSelector('.tracking-code');
  shareCodeBtn = buildSelector(this.container,'.tracking-code-btn');
  dialog = buildSelector('.tracking-code__modal');

  sendEmailFriends() {
    cy.get(this.dialog + 'button.send-button').click()
    //return this.dialog.$('button.send-button').click();
  }
}
