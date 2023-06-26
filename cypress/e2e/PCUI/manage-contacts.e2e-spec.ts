import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { MyPage } from '../../pc-ui-e2e/src/page/my-page.page';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { MyContactsPage } from '../../pc-ui-e2e/src/page/my-contacts.page';
import { scrollElemFinderIntoView, userLogin } from '../../pc-ui-e2e/src/utils/actions';
import { browser } from 'protractor';

describe('add a new contact and sort, edit contact then delete:', () => {
  let sidebar: Sidebar;
  let myPagePO: MyPage;
  let myContactsPage: MyContactsPage;
  let snackbarCO: SnackbarCO;

  beforeAll(() => {
    sidebar = new Sidebar();
    myPagePO = new MyPage();
    myContactsPage = new MyContactsPage();
    snackbarCO = new SnackbarCO();
  });

  afterAll(() => {

  });

  it('should log in', () => {
    userLogin('DaveHeaderOneTestOne');
  });

  it('should go to my contacts', () => {
    sidebar.clickEmailLink();
    browser.sleep(1000);
    sidebar.clickMyContactsLink();
    expect(myContactsPage.container.isPresent()).toBeTruthy();
    expect(myContactsPage.header.getText()).toContain('My Contacts');
  });

  it('should sort contacts', () => {
    myContactsPage.sortTableByName();
    const firstRow = myContactsPage.contactsListComponent.contactsTable.getContacts().get(0);
    scrollElemFinderIntoView(firstRow);
    expect(
      myContactsPage.contactsListComponent.contactsTable.getRowNameValue(firstRow)
    ).toContain('Zeke Zanthum');

    myContactsPage.sortTableByName();

    const firstRowAfterSort = myContactsPage.contactsListComponent.contactsTable.getContacts().get(0);
    scrollElemFinderIntoView(firstRowAfterSort);
    expect(
      myContactsPage.contactsListComponent.contactsTable.getRowNameValue(
        myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
      )
    ).toContain('Zeke Zanthum');
  });

  it('should click on add contact and add new contact', async () => {
    const number = new Date().getTime();
    await myContactsPage.clickAddNewContact();
    await myContactsPage.contactsListComponent.editContactModal.enterContactInfo(
      'Simon',
      'George',
      `Simon${number}@akanewmedia.com`,
      '555-555-5555'
    );
    await myContactsPage.contactsListComponent.editContactModal.clickSaveModalButton();
    // await snackbarCO.closeSnackBar();
    expect(
      myContactsPage.contactsListComponent.editContactModal.container.isPresent()
    ).toBeFalsy();
  });

  it('should find contact', async () => {
    myContactsPage.clickButtonSearchClear();
    await myContactsPage.enterSearch('enya').then(() => {
      expect(
        myContactsPage.contactsListComponent.contactsTable.getRowNameValue(
          myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
        )
      ).toContain('Enya Ethers');
    });
  });

  it('should click on edit contact button, make changes and cancel changes', async () => {
    const number = new Date().getTime();
    myContactsPage.clickButtonSearchClear();
    myContactsPage.enterSearch('Carla');
    myContactsPage.contactsListComponent.contactsTable.clickRowEditButton(
      myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    expect(
      myContactsPage.contactsListComponent.editContactModal.isPresent()
    ).toBeTruthy();
    myContactsPage.contactsListComponent.editContactModal.enterContactInfo(
      'Hoang777',
      'Le',
      `Hoang${number}@akanewmedia.com`,
      '777-777-7777'
    );
    myContactsPage.contactsListComponent.editContactModal.clickCancelModalButton();
    myContactsPage.clickButtonSearchClear();
    await myContactsPage.enterSearch('Hoang777');
    expect(
      await myContactsPage.contactsListComponent.contactsTable.getContacts().count()
    ).toEqual(0);
  });

  it('it should find Fabien in search', async () => {
    myContactsPage.clickButtonSearchClear();
    myContactsPage.sortTableByName();
    myContactsPage.enterSearch('Fabien');
    await browser.sleep(2000);
    expect(
      myContactsPage.contactsListComponent.contactsTable.getRowNameValue(
        myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
      )
    ).toContain('Fabien');
    expect(
      myContactsPage.contactsListComponent.contactsTable.getContacts().count()
    ).toEqual(1);
  });

  it('it should delete the first 2 rows', async () => {
    myContactsPage.clickButtonSearchClear();
    await browser.sleep(2000);
    const currentCount = await myContactsPage.contactsListComponent.contactsTable.getContacts().count();
    myContactsPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(
      myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    myContactsPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(
      myContactsPage.contactsListComponent.contactsTable.getContacts().get(1)
    );

    myContactsPage.contactsListComponent.clickDeleteSelectedButton();
    myContactsPage.contactsListComponent.clickConfirmYes()
    snackbarCO.waitforSnackBar();
   
    let countAfterDelete = await myContactsPage.contactsListComponent.contactsTable.getContacts().count();
    expect(countAfterDelete).toBeLessThan(currentCount)
    expect(currentCount - countAfterDelete).toEqual(2);
  });

  it('it should delete contact', async () => {
    const currentCount = await myContactsPage.contactsListComponent.contactsTable.getContacts().count();

    myContactsPage.clickButtonSearchClear();
    await myContactsPage.enterSearch('Barry');
    myContactsPage.contactsListComponent.contactsTable.clickRowDeleteButton(
      myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    myContactsPage.contactsListComponent.clickConfirmYes();

    snackbarCO.waitforSnackBar();
  

    myContactsPage.clickButtonSearchClear();
    myContactsPage.enterSearch('Barry');
    browser.sleep(1000).then(()=>{
      expect(
        myContactsPage.contactsListComponent.contactsTable.getContacts().count()
      ).toEqual(0);
    })
   
  });

  it('should click on edit contact button, make changes and Close modal', async () => {
    const number = new Date().getTime();
    myContactsPage.clickButtonSearchClear();
    await myContactsPage.enterSearch('Carla');
    myContactsPage.contactsListComponent.contactsTable.clickRowEditButton(
      myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    expect(
      myContactsPage.contactsListComponent.editContactModal.isPresent()
    ).toBeTruthy();
    myContactsPage.contactsListComponent.editContactModal.enterContactInfo(
      'Hoang666',
      'Le',
      `Hoang${number}@akanewmedia.com`,
      '666-777-7777'
    );
    myContactsPage.contactsListComponent.editContactModal.clickCloseModalButton();
    myContactsPage.clickButtonSearchClear();
    await myContactsPage.enterSearch('Hoang666');

    expect(
      myContactsPage.contactsListComponent.contactsTable.getContacts().count()
    ).toEqual(0);
  });

  it('should click on edit contact button, make changes and Save', async () => {
    const number = new Date().getTime();
    myContactsPage.clickButtonSearchClear();
    await myContactsPage.enterSearch('Carla');
    myContactsPage.contactsListComponent.contactsTable.clickRowEditButton(
      myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
    );
    expect(
      myContactsPage.contactsListComponent.editContactModal.isPresent()
    ).toBeTruthy();
    await myContactsPage.contactsListComponent.editContactModal.enterContactInfo(
      'Hoang555',
      'Le',
      `Hoang${number}@akanewmedia.com`,
      '555-777-7777'
    );
    await myContactsPage.contactsListComponent.editContactModal.clickSaveModalButton();

    expect(
      myContactsPage.contactsListComponent.editContactModal.container.isPresent()
    ).toBeFalsy();

    myContactsPage.clickButtonSearchClear();
    myContactsPage.enterSearch('Hoang555');
    browser.sleep(1000).then(()=>{
      expect(
        myContactsPage.contactsListComponent.contactsTable.getContacts().count()
      ).toEqual(1);

      expect(
        myContactsPage.contactsListComponent.contactsTable.getRowNameValue(
          myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
        )
      ).toContain('Hoang555');
    })
  });
});
