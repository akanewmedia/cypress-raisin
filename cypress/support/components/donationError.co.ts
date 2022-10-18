import { buildSelector } from "../utils/actions";

/**
 * Represents the error section of the form
 */
export class DonationError {
    container: any;
    title: any;
    content: any;
    constructor(container) {
      this.container = buildSelector(container, 'mat-card.error-notification');
      this.title = buildSelector(this.container, 'mat-card-title');
      this.content = buildSelector(this.container, 'mat-card-content');
    }
}

