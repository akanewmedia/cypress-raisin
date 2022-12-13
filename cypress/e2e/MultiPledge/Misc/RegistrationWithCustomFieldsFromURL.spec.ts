import { reduce } from "lodash";
import { RegisterComponent } from "../../../support/components/register.co";
import { ReturningParticipant } from "../../../support/components/returningParticipant.co";
import { FlowPage } from "../../../support/pages/flow";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { PageSetup } from "../../../support/utils/pageSetup";
import { Waiver } from "../../../support/components/waiver.co";
import * as specificData from '../../../data/Pledge/RegistrationWithCustomFieldsFromURL.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const userDetailsPO = new RegisterPage();
const flowPO = new FlowPage();

const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const waiverCO = new Waiver();

const customFieldString = reduce(data.customFields, (accumulator, customField) => {
    const customFieldMap = `${customField.queryParamString}=${customField.value}&`;
    return accumulator += customFieldMap;
}, '');

const customFields = reduce(data.customFields, (accumulator, customField) => {
    accumulator[customField.fieldName] = customField.value;
    return accumulator;
}, {});

describe('Registration with custom fields loaded from URL : ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup = new PageSetup();
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
                //pageSetup.logoutIfLoggedIn();
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });

            it('should got to the registration page with custom fields', () => {
                pageSetup.goToSite(`${event}/pledge/registration/start?${customFieldString}`.slice(0, -1));                
            });

            it('should start registration', () => {
                cy.get(registerCO.container).should('be.visible')
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(0, 0);
                cy.get(returningParticipantCO.container).should('be.visible')
            });

            it('should create a new account and accept the waiver', () => {
                returningParticipantCO.createAccount();
                cy.get(waiverCO.container).should('be.visible')
                waiverCO.selectWaiverAcceptance(true);
                flowPO.continue();
                cy.get(userDetailsPO.container).should('be.visible')
            });

            it('should show the custom fields populated with the query string values', () => {
                userDetailsPO.verifyCustomFieldsHaveValues(customFields);
            });
        });
    });
});
