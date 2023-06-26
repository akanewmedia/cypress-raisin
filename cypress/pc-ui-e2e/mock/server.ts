import * as express from 'express';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import {
  find, startsWith, isNil, get, unionBy,
  concat, assign, endsWith, includes, compact,
  pick, omit, deburr, toLower, findIndex, isEqual,
  isEmpty
} from 'lodash';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  if ('OPTIONS' === req.method) {
    // respond with 200
    res.sendStatus(200);
  } else {
    // move on
    next();
  }
});

let participantProfile;
let myPage;
let customTemplates;
let emailContentList;
let teamPage;
let teamMembers;
let teamProfile;
let offlineDonations = null;
let contacts = [];
let contactId = null;
app.post('/login', (req: any, res: any) => {
  let roles = ['Individual'];
  const authorizationHeader = get(req.headers, 'authorization');
  const isRegenerateTokenRequest = !isNil(authorizationHeader);
  if (startsWith(req.body.username, 'tm') || isRegenerateTokenRequest) {
    roles = ['Individual', 'TeamMember'];
  } else if (startsWith(req.body.username, 'tc')) {
    roles = ['Individual', 'TeamMember', 'TeamCaptain'];
  }
  res.status(200).send({
    roles,
    access_token: 'cristoken',
    culture: 'en-CA',
  });
});

app.post('/usernotification', (req: any, res: any) => {
  switch (req.body.operationName) {
    case 'UserNotifications':
      const variables = req.body.variables;
      const userNotificationTypeId = get(variables, 'userNotificationTypeId');

      switch (userNotificationTypeId) {
        case 2:
          fs.readFile(`${__dirname}/data/userNotifications/activityFeed.json`, 'utf8', (error, jsonData) => {
            let activityFeed = JSON.parse(jsonData).activityFeed;
            const totalCount = activityFeed.length;
            const cursor = variables.after;
            let hasNextPage = true;
            let offset = 0;
            for (let i = 0; i < activityFeed.length; i++) {
              if (variables.after === activityFeed[i].id) {
                offset = i + 1;
                hasNextPage = ((activityFeed.length - offset) > 5);
                break;
              }
            }
            activityFeed = activityFeed.slice(0 + offset, 5 + offset);
            const response = {
              totalCount,
              items: activityFeed,
              pageInfo: {
                hasNextPage,
                endCursor: hasNextPage ? activityFeed[4].id : null,
                __typename: 'PageInfo'
              },
              __typename: 'UserNotificationConnection'
            };
            res.status(200).send(JSON.stringify({ data: { userNotifications: response } }));
          });
          break;
        case 3:
          fs.readFile(`${__dirname}/data/userNotifications/badgeFeed.json`, 'utf8', (error, jsonData) => {
            const badgeFeed = JSON.parse(jsonData).badgeFeed;
            const response = {
              totalCount: badgeFeed.length,
              items: badgeFeed,
              pageInfo: {
                hasNextPage: false,
                endCursor: null,
                __typename: 'PageInfo'
              },
              __typename: 'UserNotificationConnection'
            };
            res.status(200).send(JSON.stringify({ data: { userNotifications: response } }));
          });
          break;
        case 4:
          fs.readFile(`${__dirname}/data/userNotifications/toDoFeed.json`, 'utf8', (error, jsonData) => {
            const toDoFeed = JSON.parse(jsonData).toDoFeed;
            const totalCount = toDoFeed.length;
            const cursor = variables.after;
            const hasNextPage = (totalCount - variables.first > 0) && isNil(cursor);
            const response = {
              totalCount,
              items: toDoFeed,
              pageInfo: {
                hasNextPage,
                endCursor: hasNextPage ? 'abcd' : null,
                __typename: 'PageInfo'
              },
              __typename: 'UserNotificationConnection'
            };
            res.status(200).send(JSON.stringify({ data: { userNotifications: response } }));
          });
          break;
        default:
          res.status(200).send(JSON.stringify({
            data: {
              userNotifications: null
            },
            errors: [{
              message: 'GraphQL.ExecutionError: Unhandled Exception',
              extensions: {
                code: '1'
              }
            }]
          }));
          break;
      }
      break;
    case 'UserNotificationSettings':
      const responseResult = {
        data: {
          settings: {
            isBadgingEnabled: true,
            __typename: 'UserNotificationSettingsType'
          }
          activityFeed = activityFeed.slice(0 + offset, 5 + offset);
          const response = {
            totalCount,
            items: activityFeed,
            pageInfo: {
              hasNextPage,
              endCursor: hasNextPage ? activityFeed[4].id : null,
              __typename: 'PageInfo',
            },
            __typename: 'UserNotificationConnection',
          };
          res
            .status(200)
            .send(JSON.stringify({ data: { userNotifications: response } }));
        }
      };
      res.status(200).send(responseResult);
      break;
    case 'ProcessBadges':
      res.status(200).send({ data: true });
      break;
    default:
      res.status(200).send();
  }
});

app.post('/donations', (req: any, res: any) => {
  switch (req.body.operationName) {
    case 'ReissueTaxReceipt':
      const responseResult = {
        data: {
          reissueReceipt: {
            id: 10,
            number: 'TEST-3005505-VOID',
            status: 'Pending',
            __typename: 'TaxReceiptType',
          },
        },
      };
      if (req.body.variables.donationId === 2) {
        res.status(404).send('unable to generate Tax receipt');
      } else {
        res.status(200).send(responseResult);
      }
      break;

    case 'OfflineDonationSettings':
      const response = {
        data: {
          offlineDonations: {
            settings: {
              waiver: 'Waiver Text',
              cvvEnabled: true,
              enabled: true,
              __typename: 'OfflineDonationSettingsType'
            },
            __typename: 'OfflineDonationsType'
          }
        }
      };
      res.status(200).send(JSON.stringify(response));
      break;
    case 'OfflineDonations':
      if (offlineDonations !== null) {
        res.status(200).send(JSON.stringify({ offlineDonations }));
      } else {
        fs.readFile(`${__dirname}/data/donations/offline.json`, 'utf8', (error, jsonData) => {
          const data = JSON.parse(jsonData);
          offlineDonations = data;
          res.status(200).send(JSON.stringify({ data }));
        });
      }
      break;
    case 'CreateOfflineDonation':
      res.status(200).send(JSON.stringify({ data: { offlineDonations: { create: true, __typename: 'Boolean!' } } }));
      break;
    case 'PayOfflineDonation':
      res.status(200).send(JSON.stringify({ data: { offlineDonations: { pay: '23456', __typename: 'String!' } } }));
      break;
    case 'UpdateOfflineDonation':
      offlineDonations = unionBy(
        [req.body.variables],
        offlineDonations,
        'id'
      );
      const od = find(offlineDonations, req.body.variables.id);
      res.status(200).send(JSON.stringify({ data: { offlineDonation: od } }));
      break;
    case 'DonationsHistory':
      if (
        !req.body.variables.subEventId ||
        req.body.variables.subEventId === -1
      ) {
        fs.readFile(
          `${__dirname}/data/donations/participant.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            res.status(200).send(JSON.stringify({ data }));
          }
        );
      } else {
        fs.readFile(
          `${__dirname}/data/donations/participant${req.body.variables.subEventId}.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            res.status(200).send(JSON.stringify({ data }));
          }
        );
      }
      break;
    case 'TeamDonationsHistory':
      fs.readFile(
        `${__dirname}/data/donations/team.json`,
        'utf8',
        (error, jsonData) => {
          const data = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify({ data }));
        }
      );
      break;
    default:
      res.status(200).send();
  }
});

function appendCustomTemplatesAndReturn(sampleTemplates, res) {
  if (customTemplates) {
    res.status(200).send(JSON.stringify({ data: { emailTemplate: concat(sampleTemplates, customTemplates) } }));
  } else {
    fs.readFile(`${__dirname}/data/emails/customTemplates.json`, 'utf8', (error, jsonData) => {
      const data = JSON.parse(jsonData);
      customTemplates = data.emailTemplate;
      res.status(200).send(JSON.stringify({ data: { emailTemplate: concat(sampleTemplates, customTemplates) } }));
    });
  }
}

app.post('/email', (req: any, res: any) => {
  switch (req.body.operationName) {
    case 'EmailTemplate':
      const languageId = get(req.body.variables, 'languageId', 1);
      if (languageId === 1) {
        fs.readFile(
          `${__dirname}/data/emails/englishTemplates.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            appendCustomTemplatesAndReturn(data.emailTemplate, res);
          }
        );
      } else {
        fs.readFile(
          `${__dirname}/data/emails/frenchTemplates.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            appendCustomTemplatesAndReturn(data.emailTemplate, res);
          }
        );
      }
      break;
    case 'SupportedLanguages':
      res.status(200).send(JSON.stringify({ data: { supportedLanguages: [1, 2] } }));
      break;
    case 'EmailContent':
      const templateId = get(req.body.variables, 'templateId', 1);
      if (emailContentList) {
        res.status(200).send(JSON.stringify({ data: { emailContent: find(emailContentList, { id: templateId }) } }));
      } else {
        fs.readFile(`${__dirname}/data/emails/emailContent.json`, 'utf8', (error, jsonData) => {
          const data = JSON.parse(jsonData);
          emailContentList = data.emails;
          res.status(200).send(JSON.stringify({ data: { emailContent: find(emailContentList, { id: templateId }) } }));
        });
      }
      break;
    case 'SendEmail':
      const emailMessageInput = get(req.body.variables, 'emailMessageInput');
      // simulate error if subject 'Error' is in the send email request
      if (emailMessageInput.content.subject === 'Error') {
        res.status(200).send(
          JSON.stringify({
            data: {
              emailSentToContacts: null,
            },
            errors: [
              {
                message: 'GraphQL.ExecutionError: Unhandled Exception',
                extensions: {
                  code: '1',
                },
              },
            ],
          })
        );
      }
      res.status(200).send(
        JSON.stringify({
          data: {
            emailMessages: true,
          },
        })
      );
      break;
    case 'EmailTemplateContent':
      const emailTemplate = get(req.body.variables, 'emailTemplateContentInput');
      const emailTemplateId = emailTemplate.id === -1 ? emailContentList.length : emailTemplate.id;
      if (emailContentList) {
        emailContentList = unionBy(
          [{
            ...emailTemplate,
            emailTemplateId,
            id: emailTemplateId,
            languageId: 0,
            message: 'New Custom Template',
            __typename: 'EmailContentType'
          }],
          emailContentList,
          'id'
        );
        customTemplates = unionBy(
          [{
            id: emailTemplateId,
            __typename: 'EmailTemplateType',
            kind: 'CUSTOM',
            languageId: 0,
            name: emailTemplate.name,
            emailTemplateTypeId: emailTemplate.emailTemplateTypeId
          }],
          customTemplates,
          'id'
        );
        res.status(200).send(JSON.stringify({ data: { emailTemplateContent: find(emailContentList, { id: emailTemplateId }) } }));
      } else {
        fs.readFile(`${__dirname}/data/emails/emailContent.json`, 'utf8', (error, jsonData) => {
          const data = JSON.parse(jsonData);
          emailContentList = unionBy(
            [{
              ...emailTemplate,
              emailTemplateId,
              id: emailTemplateId,
              languageId: 0,
              message: 'New Custom Template',
              __typename: 'EmailContentType'
            }],
            data.emails,
            'id'
          );
          customTemplates = unionBy(
            [{
              id: emailTemplateId,
              __typename: 'EmailTemplateType',
              kind: 'CUSTOM',
              languageId: 0,
              name: emailTemplate.name,
              emailTemplateTypeId: emailTemplate.emailTemplateTypeId
            }],
            customTemplates,
            'id'
          );
          res.status(200).send(JSON.stringify({ data: { emailTemplateContent: find(emailContentList, { id: emailTemplateId }) } }));
        });
      }
      break;
    case 'EmailBadge':
      fs.readFile(`${__dirname}/data/emails/emailBadge.json`, 'utf8', (error, jsonData) => {
        const data = JSON.parse(jsonData);
        res.status(200).send(JSON.stringify({ data }));
      });
      break;
    default:
      fs.readFile(
        `${__dirname}/data/emails/templates.json`,
        'utf8',
        (error, jsonData) => {
          const data = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify({ data }));
        }
      );
  }
});

app.post('/content', (req: any, res: any) => {
  switch (req.body.operationName) {
    case 'ParticipantPage':
      if (
        !req.body.variables.subEventId ||
        req.body.variables.subEventId === 0
      ) {
        if (!myPage) {
          fs.readFile(
            `${__dirname}/data/page/participantPage.json`,
            'utf8',
            (error, jsonData) => {
              const data = JSON.parse(jsonData);
              myPage = data;
              res.status(200).send(JSON.stringify({ data }));
            }
          );
        } else {
          res.status(200).send(JSON.stringify({ data: myPage }));
        }
      } else {
        fs.readFile(
          `${__dirname}/data/page/participantPage${req.body.variables.subEventId}.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            res.status(200).send(JSON.stringify({ data }));
          }
        );
      }
      break;
    case 'UpdateParticipantPage':
      myPage.participantPage = assign(myPage.participantPage, req.body.variables.participantPage);
      res.status(200).send(JSON.stringify({ data: { participantPage: true } }));
      break;
    case 'GetParticipantMainImages':
      fs.readFile(
        `${__dirname}/data/teams/memberMainImages.json`,
        'utf8',
        (error, jsonData) => {
          const participantMainImages = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify({ data: participantMainImages }));
        }
      );
      break;
    case 'TeamPage':
      if (!teamPage) {
        fs.readFile(
          `${__dirname}/data/teams/teamPage.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            teamPage = data;
            res.status(200).send(JSON.stringify({ data }));
          }
        );
      } else {
        res.status(200).send(JSON.stringify({ data: teamPage }));
      }
      break;
    case 'UpdateTeamPage':
      teamPage.teamPage = assign(teamPage.teamPage, req.body.variables.teamPage);
      res.status(200).send(JSON.stringify({ data: { teamPage: true } }));
      break;
    case 'GetTeamMainImages':
      fs.readFile(
        `${__dirname}/data/teams/teamMainImages.json`,
        'utf8',
        (error, jsonData) => {
          const teamMainImages = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify({ data: teamMainImages }));
        }
      );
      break;
    case 'SiteSettings':
      fs.readFile(
        `${__dirname}/data/teams/siteSettings.json`,
        'utf8',
        (error, jsonData) => {
          const siteSettings = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify({ data: siteSettings }));
        }
      );
      break;
    case 'SocialSetting':
      fs.readFile(
        `${__dirname}/data/page/socialSetting.json`,
        'utf8',
        (error, jsonData) => {
          const socialSetting = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify({ data: socialSetting }));
        }
      );
      break;
    default:
      res.status(200).send();
  }
});

app.post('/user', (req: any, res: any) => {
  switch (req.body.operationName) {
    case 'MinFundraisingGoal':
      res.status(200).send(JSON.stringify({ data: { minFundraisingGoal: 0 } }));
      break;
    case 'CanUseCustomPart':
      res
        .status(200)
        .send(JSON.stringify({ data: { canUseCustomPart: true } }));
      break;
    case 'FundraisingGoal':
      res
        .status(200)
        .send(JSON.stringify({ data: { participantProfile: { goal: 100 } } }));
      break;
    case 'ProfileId':
      res.status(200).send(JSON.stringify({
        data: {
          participant: {
            userId: 2,
            subEventId: 23208,
            __typename: 'ParticipantType'
          }
        }
      }));
      break;
    case 'ParticipantProfile':
      if (!participantProfile) {
        fs.readFile(
          `${__dirname}/data/page/participantProfile.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            participantProfile = data;
            res.status(200).send(JSON.stringify({ data }));
          }
        );
      } else {
        res.status(200).send(JSON.stringify({ data: participantProfile }));
      }
      break;
    case 'UpdateParticipantProfile':
      const vars = req.body.variables;
      participantProfile.participant = assign(participantProfile.participant, vars.participant);
      if (vars.customPart) {
        delete participantProfile.participant.customPart;
        participantProfile.participant.url.customPart = vars.customPart;
      }
      res
        .status(200)
        .send(JSON.stringify({ data: { participant: { profile: true } } }));
      break;
    case 'UpdateParticipantAttributes':
      res
        .status(200)
        .send(JSON.stringify({ data: { participant: { attributes: true } } }));
      break;
    case 'GetSecuritySettings':
      const settings = req.body.variables;
      res.status(200).send(JSON.stringify({
        data: {
          securitySettings: {
            culture: endsWith(settings.customPart, 'fr') ? 'fr-CA' : 'en-CA',
            baseUrl: `https://dev2.raisinlocal.com/${settings.customPart}`,
            __typename: 'SecuritySettingsType'
          }
        }
      }));
      break;
    case 'PreviousSubEvents':
      fs.readFile(
        `${__dirname}/data/page/previousSubEvents.json`,
        'utf8',
        (error, jsonData) => {
          const data = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify(data));
        }
      );
      break;
    case 'UserNameQuery':
      if (!participantProfile) {
        fs.readFile(
          `${__dirname}/data/page/participantUserName.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            participantProfile = data;
            res.status(200).send(JSON.stringify({ data }));
          }
        );
      } else {
        res.status(200).send(JSON.stringify({ data: participantProfile }));
      }
      break;
    default:
      res.status(200).send();
      break;
  }
});

app.get('/getApiToken.js', (req: any, res: any) => {
  res.status(200).send(JSON.stringify({ token: '66fbd0ba-3325-4f14-adc5-9e662e62c763' }));
});

app.get('/previousSubEvents', (req: any, res: any) => {
  fs.readFile(
    `${__dirname}/data/page/previousSubEvents.json`,
    'utf8',
    (error, jsonData) => {
      const data = JSON.parse(jsonData);
      res.status(200).send(JSON.stringify(data.previousSubEvents));
    }
  );
});
app.get('/donationsTeam', (req: any, res: any) => {
  fs.readFile(
    `${__dirname}/data/donations/team.json`,
    'utf8',
    (error, jsonData) => {
      const data = JSON.parse(jsonData);
      res.status(200).send(JSON.stringify(data.teamDonations));
    }
  );
});
app.get('/donationsOffline', (req: any, res: any) => {
  fs.readFile(
    `${__dirname}/data/donations/offline.json`,
    'utf8',
    (error, jsonData) => {
      const data = JSON.parse(jsonData);
      res.status(200).send(JSON.stringify(data.donationsOffline));
    }
  );
});

let contacts = [];
let contactId = null;

app.post('/contact', (req: any, res: any) => {
  if (contactId === undefined) {
    contactId = 200000;
  }

  switch (req.body.operationName) {
    case 'Contacts':
    case 'GetAllContacts':
    case 'GetAllContactsWithFollowUps':
      if (isEmpty(contacts)) {
        fs.readFile(`${__dirname}/data/emails/contactsWithFollowUps.json`, 'utf8', (error, jsonData) => {
          const data = JSON.parse(jsonData);
          contacts = data.contacts;
          res.status(200).send(JSON.stringify({ data }));
        });
      } else {
        res.status(200).send(JSON.stringify({ data: { contacts } }));
      }
      break;
    case 'GetCloudspongeKey':
    case 'GetRaisinDomain':
      fs.readFile(
        `${__dirname}/data/emails/config.json`,
        'utf8',
        (error, jsonData) => {
          const data = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify({ data }));
        }
      );
      break;
    case 'SaveContacts':
      const contactsInput = get(req.body.variables, 'contactsInput');

      contactsInput.forEach((contact) => {
        contact.__typename = 'ContactType';
        contact.type = 'Donor';
        contact.followUp = {
          date: '',
          donationAmount: '',
          status: 'NOT_SENT',
          __typename: 'FollowUpType',
        };
        if (contact.id === -1) {
          contact.id = contactId;
          contactId = contactId + 1;
          contacts.push(contact);
        }
        const index = findIndex(contacts, { id: contact.id });
        if (index) {
          contacts[index] = contact;
        } else {
          contacts = [...contacts, contact];
        }
      });
      res.status(200).send(
        JSON.stringify({
          data: { contacts },
        })
      );
      break;
    case 'DeleteContacts':
      const contactIds = get(req.body.variables, 'contactIdsInput');
      if (includes(contactIds, 1)) {
        // simulate error if contact id 1 is in the deletion request
        res.status(200).send(
          JSON.stringify({
            data: {
              deleteContacts: null,
            },
            errors: [
              {
                message: 'GraphQL.ExecutionError: Unhandled Exception',
                extensions: {
                  code: '1',
                },
              },
            ],
          })
        );
        return;
      }

      contacts = [...contacts.map(contactItem => {
        if (!includes(contactIds, contactItem.id)) {
          return contactItem;
        }
      })];
      contacts = compact(contacts);
      res.status(200).send(JSON.stringify({
        data: {
          deleteContacts: true
        }
      }));
      break;
    case 'EmailsSentMutation':
      res.status(200).send(
        JSON.stringify({
          data: {
            emailSentToContacts: true,
          },
        })
      );
      break;
    default:
      res.status(200).send(JSON.stringify({}));
  }
});

function extractTeamReturn(
  teamWrapper,
  isTeamWithPasswordConfigurationQuery = false,
  isTeamUserQuery = false
) {
  const team = teamWrapper.team;
  const passwordFields = ['password', 'passwordProtectionConfiguration'];
  if (isTeamWithPasswordConfigurationQuery) {
    return { team };
  }
  if (isTeamUserQuery) {
    return { team: pick(team, ['teamUserId', '__typename']) };
  }
  return { team: omit(team, passwordFields) };
}

function isTeamWithPasswordConfigQuery(requestQuery) {
  return includes(requestQuery, 'passwordProtectionConfiguration');
}

app.post('/team', (req: any, res: any) => {
  switch (req.body.operationName) {
    case 'MinFundraisingGoal':
      res.status(200).send(JSON.stringify({ data: { minFundraisingGoal: 0 } }));
      break;
    case 'CanUseCustomPart':
      res
        .status(200)
        .send(JSON.stringify({ data: { canUseCustomPart: true } }));
      break;
    case 'Team':
    case 'TeamWithPasswordConfiguration':
      if (!teamProfile) {
        fs.readFile(
          `${__dirname}/data/teams/team.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            teamProfile = data;
            res.status(200).send(
              JSON.stringify({
                data: extractTeamReturn(
                  teamProfile,
                  isTeamWithPasswordConfigQuery(req.body.query)
                ),
              })
            );
          }
        );
      } else {
        res.status(200).send(
          JSON.stringify({
            data: extractTeamReturn(
              teamProfile,
              isTeamWithPasswordConfigQuery(req.body.query)
            ),
          })
        );
      }
      break;
    case 'TeamMembers':
      if (!teamMembers) {
        fs.readFile(
          `${__dirname}/data/teams/members.json`,
          'utf8',
          (error, jsonData) => {
            const data = JSON.parse(jsonData);
            teamMembers = data;
            res.status(200).send(JSON.stringify({ data }));
          }
        );
      } else {
        res.status(200).send(JSON.stringify({ data: teamMembers }));
      }
      break;
    case 'Teams':
      fs.readFile(`${__dirname}/data/teams/teams.json`, 'utf8', (error, jsonData) => {
        let teams = JSON.parse(jsonData).teams;
        const variables = req.body.variables;
        const text = toLower(deburr(variables.text));
        teams = teams.filter(team =>
          toLower(deburr(team.name)).includes(text) ||
          toLower(deburr(team.captain.firstName)).includes(text) ||
          toLower(deburr(team.captain.lastName)).includes(text)
        );
        const totalCount = teams.length;
        const cursor = variables.after;
        const hasNextPage = (totalCount - variables.first > 0) && isNil(cursor);
        const offset = isNil(cursor) ? 0 : variables.first;
        teams = teams.slice(0 + offset, variables.first + offset);
        const response = {
          totalCount,
          items: teams,
          pageInfo: {
            hasNextPage,
            endCursor: hasNextPage ? 'abcd' : null,
            __typename: 'PageInfoType'
          },
          __typename: 'TeamConnection'
        };
        res.status(200).send(JSON.stringify({ data: { teams: response } }));
      });
      break;
    case 'UpdateTeamProfile':
      teamProfile.team.url.customPart = req.body.variables.team.customPart;
      teamProfile.team = assign(teamProfile.team, omit(req.body.variables.team, ['passwordRequired', 'customPart']));
      res.status(200).send(JSON.stringify({ data: { team: true } }));
      break;
    case 'JoinTeam':
      fs.readFile(`${__dirname}/data/teams/teams.json`, 'utf8', (error, jsonData) => {
        const teams = JSON.parse(jsonData).teams;
        const teamId = get(req.body.variables, 'teamId');
        const team = find(teams, { id: teamId });
        if (get(team, 'passwordRequired')) {
          const password = get(req.body.variables, 'password');
          // simulate error if password is not akaaka
          if (isNil(password) || !isEqual(password, 'akaaka')) {
            res.status(200).send(JSON.stringify({
              data: {
                join: true,
              },
            })
            );
          }
      );
      break;
    case 'TeamConfiguration':
      fs.readFile(
        `${__dirname}/data/teams/teamConfiguration.json`,
        'utf8',
        (error, jsonData) => {
          const teamConfiguration = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify({ data: teamConfiguration }));
        }
      );
      break;
    default:
      res.status(200).send();
      break;
  }
});

app.post('/statistics/graphql', (req: any, res: any) => {
  switch (req.body.operationName) {
    case 'GetSecuritySettings':
      fs.readFile(
        `${__dirname}/data/statistics/securitySettings.json`,
        'utf8',
        (error, jsonData) => {
          const securitySettings = JSON.parse(jsonData);
          res.status(200).send(JSON.stringify({ data: securitySettings }));
        }
      );
      break;
    default:
      res.status(200).send();
      break;
  }
});

app.get(
  '/statistics/api/fitnesssummary/participant/5423534',
  (req: any, res: any) => {
    fs.readFile(
      `${__dirname}/data/statistics/fitnesssummary.json`,
      'utf8',
      (error, jsonData) => {
        const data = JSON.parse(jsonData);
        res.status(200).send(JSON.stringify(data));
      }
    );
  }
);

app.get('/followUps', (req: any, res: any) => {
  fs.readFile(
    `${__dirname}/data/emails/followUps.json`,
    'utf8',
    (error, jsonData) => {
      const data = JSON.parse(jsonData);
      res.status(200).send(JSON.stringify(data.followUps));
    }
  );
});
app.get('/teamList', (req: any, res: any) => {
  fs.readFile(
    `${__dirname}/data/teams/teams.json`,
    'utf8',
    (error, jsonData) => {
      const data = JSON.parse(jsonData);
      res.status(200).send(JSON.stringify(data.teams));
    }
  );
});
app.get('/teamMembers', (req: any, res: any) => {
  fs.readFile(
    `${__dirname}/data/teams/members.json`,
    'utf8',
    (error, jsonData) => {
      const data = JSON.parse(jsonData);
      res.status(200).send(JSON.stringify(data.teamMembers));
    }
  );
});
app.get('/team', (req: any, res: any) => {
  fs.readFile(
    `${__dirname}/data/teams/team.json`,
    'utf8',
    (error, jsonData) => {
      const data = JSON.parse(jsonData);
      res.status(200).send(JSON.stringify(data.team));
    }
  );
});
app.get('/honourRoll', (req: any, res: any) => {
  fs.readFile(
    `${__dirname}/data/page/honourRoll.json`,
    'utf8',
    (error, jsonData) => {
      const data = JSON.parse(jsonData);
      res.status(200).send(JSON.stringify(data.honourRoll));
    }
  );
});
app.get('/personalPageSetup', (req: any, res: any) => {
  fs.readFile(
    `${__dirname}/data/page/personalPage.json`,
    'utf8',
    (error, jsonData) => {
      const data = JSON.parse(jsonData);
      res.status(200).send(JSON.stringify(data.personalPageSetup));
    }
  );
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('E2E Mock server shutdown successfully');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('E2E Mock server shutdown successfully');
    process.exit(0);
  });
});
