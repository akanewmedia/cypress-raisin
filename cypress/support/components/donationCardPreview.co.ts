import { buildSelector } from "../utils/actions";
export class DonationCardPreviewComponent {
  private container: any;
  private message: any;

  constructor() {
    this.container = buildSelector('.cdk-overlay-container');
    this.message = buildSelector('.preview-message', this.container);
  }

  getMessage() {
    return this.message.getText();
  }
}

