import { elementByClass } from "../utils/actions";
export class DonationCardPreviewComponent {
  private container: any;
  private message: any;

  constructor() {
    this.container = elementByClass('.cdk-overlay-container');
    this.message = elementByClass('.preview-message', this.container);
  }

  getMessage() {
    return this.message.getText();
  }
}

