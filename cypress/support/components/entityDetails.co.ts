//The information regarding the libraries
import { clickElement, elementByClass } from "../utils/actions";

export class EnitytDetails {
  container: any;
  participantTop: any;
  teamPageButton: any;
  joinTeamButton: any;
  sideDonateNowButton: any;
  honourRoll: any;
  thermometerContainer: any;
  locationLink: any;
  locationLinkDisabled: any;
  constructor() {
    this.container = elementByClass('.base-page');
    this.participantTop = elementByClass(this.container, '.rs-preview__header');
    this.teamPageButton = elementByClass(this.participantTop, 'a[rx-team-link][isjointeam="false"]');
    this.joinTeamButton = elementByClass(this.participantTop, '.info-buttons a.join');
    this.sideDonateNowButton = elementByClass(this.participantTop, 'a.donate');
    this.honourRoll = elementByClass(this.container, '.honour-roll');
    this.thermometerContainer = elementByClass(this.container, '.thermometer-container');
    this.locationLink = elementByClass(this.participantTop, '.team-links [widget-group-name] div a');
    this.locationLinkDisabled = elementByClass(this.participantTop, '.team-links [widget-group-name] div a.disable');
  }

  joinTeam() {
    clickElement(this.joinTeamButton);
  }

  sideDonateNow() {
    clickElement(this.sideDonateNowButton);
  }

  /**
   * Clicks on the location name anchor tag near the top of the page
   */
  clickLocationName() {
    this.locationLink.click();
  }
}

