import { buildSelector, elementByClass } from "../utils/actions";

export class MainToolbar {
  container = buildSelector('.mat-toolbar[aria-labelledby="pcMainToolbar"] ');
  badgeButton = buildSelector(this.container,'button.pc-badge');
  badgeIcon = buildSelector(this.badgeButton,'[svgicon="pc-badge"]');
  pcTour = buildSelector(this.container + 'pc-tour')
  //pcAccount = buildSelector(this.container)
  myAccountMenuList = buildSelector(this.container + '.account-menu__actions mat-list')
  accountSettings = buildSelector('.account-menu__actions mat-list .mat-list-item-content span')


  getBadgeCount() {
    return cy.get(this.badgeIcon)
      .then(x => Number(x || '0'));
  }

  closeBadgeDialog() {
    cy.get('pc-badge-overview button[mat-dialog-close]').click();
  }

  clickOnProfile(){
    cy.contains(this.container + " button", "My Account").click()
    cy.contains(this.accountSettings, 'Account Settings').click()
  }
}
