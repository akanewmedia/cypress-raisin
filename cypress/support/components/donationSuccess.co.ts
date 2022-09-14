import { elementById } from "../utils/actions";

export class DonationSuccessComponent {
  container: any;
  successMessage: any;
  constructor() {
    this.container = elementById('app-donations-success');
    this.successMessage = elementById(this.container, '.mat-card-content');
  }
}
