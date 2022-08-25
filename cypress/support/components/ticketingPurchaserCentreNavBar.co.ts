import { elementByClass } from "../utils/actions";

export class ticketingPurchaserCentreNavBar {
  navbar: any;
  yourProfile: any;
  yourPurchases: any;
  manageAttendees: any;
  constructor() {
    this.navbar = elementByClass('.pc-menu-container');
    this.yourProfile = elementByClass(this.navbar, 'ul li:nth-child(1) a');
    this.yourPurchases = elementByClass(this.navbar, 'ul li:nth-child(1) a');
    this.manageAttendees = elementByClass(this.navbar, 'ul li:nth-child(1) a');
  }

  clickYourProfile() {
    this.yourProfile.click();
  }

  clickYourPurchases() {
    this.yourPurchases.click();
  }

  clickManageAttendees() {
    this.manageAttendees.click();
  }

}
