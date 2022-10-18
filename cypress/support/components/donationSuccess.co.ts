import { buildSelector } from "../utils/actions";

export class DonationSuccessComponent {
  container: any;
  successMessage: any;
  constructor() {
    this.container = buildSelector('app-donations-success');
    this.successMessage = buildSelector(this.container, '.mat-card-content');
  }
}
