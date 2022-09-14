import { buildSelector, elementByClass } from "../utils/actions";

/**
 * Represents the Donate As modal that comes up when you try to donate while logged in.
 */
export class DonateAsComponent {
  container: any;
  sponsorBtn: any;
  sponsorNewBtn: any;
  constructor() {
    this.container = buildSelector(".returning-user");
    this.sponsorBtn = buildSelector(this.container, '#sponsor');
    this.sponsorNewBtn = buildSelector(this.container, '#sponsorNew');
  }

  /**
   * Presses the sponsor "As Yourself" button in the "donate as" modal
   */
  pressSponorAsYourselfBtn() {
    this.sponsorBtn.click();
  }

  /**
   * Presses the sponsor "As New Donor" button in the "donate as" modal
   */
  pressSponorAsNewDonorBtn() {
    this.sponsorNewBtn.click();
  }
}
