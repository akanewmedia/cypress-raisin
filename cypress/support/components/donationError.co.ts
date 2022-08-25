/**
 * Represents the error section of the form
 */
export class DonationError {
    container: any;
    title: any;
    content: any;
    constructor(container) {
        this.container = container.$('mat-card.error-notification');
        this.title = this.container.$('mat-card-title');
        this.content = this.container.$('mat-card-content');
    }
}

