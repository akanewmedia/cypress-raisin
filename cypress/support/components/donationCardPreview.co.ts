import { buildSelector } from "../utils/actions";
export class DonationCardPreviewComponent {
  private container: any;
  private message: any;

  constructor() {
    this.container = buildSelector('.cdk-overlay-container');
    this.message = buildSelector(this.container, '.preview-message');
  }

  getMessage() {
    return cy.get(this.message)
  }
}

