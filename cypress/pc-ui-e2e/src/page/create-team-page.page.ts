import { EditPanel } from '../component/edit-panel.component';
import { PagePreview } from '../component/page-preview.component';
import { buildSelector } from '../utils/actions';
import { JoinPanel } from '../component/join-panel.component';
export class CreateTeamPage {
  container: any;
  header: any;
  editButton: any;
  createTeamPanel: any;
  createTeamButton: any;
  customizeContainer: any;
  editPanel: EditPanel;
  joinPanel: JoinPanel;
  pagePreview: PagePreview;

  constructor() {
    this.container = buildSelector('.team-page');
    this.header = buildSelector(this.container,'.page-header');
    this.createTeamPanel = buildSelector(this.container,'.create-team');
    this.createTeamButton = buildSelector(this.createTeamPanel, '.mat-mdc-flat-button[id="createTeamButton"]');
    this.customizeContainer = buildSelector(this.container,'.preview-team__customize');
    this.editButton = buildSelector(this.customizeContainer, 'button');
    this.editPanel = new EditPanel();
    this.joinPanel = new JoinPanel();
    this.pagePreview = new PagePreview();
  }

  async isVisible(){
    // waitForElement(this.container);
    cy.get(this.container).should('be.visible')
    // return this.container.isDisplayed();
  }

  async clickCreateTeamButton(): Promise<void> {
    cy.get(this.createTeamButton).click();
  }

  async switchToPreview(): Promise<void> {
    // scrollElemFinderIntoView(elementByClass('.preview-team__preview'));
    cy.get('.preview-team__preview')
    // await switchToIFrame(elementByClass('.preview-team__preview'));
  }

  // async switchToMainWindow(): Promise<void> {
  //   return switchToMainWindow();
  // }
  async getPageTitle() {
    // scrollElemFinderIntoView(this.pagePreview.pageTitle);
    cy.get(this.pagePreview.pageTitle);
  }
}
