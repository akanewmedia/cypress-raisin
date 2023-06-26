import { ContactsListComponent } from '../component/contacts-list-component';
import { buildSelector } from '../utils/actions';

export class TeamProgressPage {
  container: any;
  header: any;
  contactsListComponent: ContactsListComponent;

  constructor() {
    this.container = buildSelector('.team-progress-component');
    this.contactsListComponent = new ContactsListComponent(this.container);
    this.header = buildSelector(this.container, '.page-header');
  }
}
