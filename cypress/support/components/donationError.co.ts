import { elementById } from "../utils/actions";

/**
 * Represents the error section of the form
 */
export class DonationError {
    container: any;
    title: any;
    content: any;
    constructor(container) {
      this.container = elementById(container, 'mat-card.error-notification');
      this.title = elementById(this.container, 'mat-card-title');
      this.content = elementById(this.container, 'mat-card-content');
    }
}

