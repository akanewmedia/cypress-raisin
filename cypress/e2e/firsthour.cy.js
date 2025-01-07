import { PageSetup } from '../support/utils/pageSetup';

// Instantiate PageSetup and get the environment
const pageSetup = new PageSetup();
const environment = pageSetup.setEnvironment();

//import './SinglePledge/Register/Individual/SinglePledgeRegisterAllFieldsRequired.spec'
import './MultiPledge/Register/Individual/3165-MultiPledgeRegisterIndividualReturningParticipantMR.spec';
import './MultiPledge/Register/Individual/648-MultiPledgeRegisterAllFieldsRequired.spec';
import './MultiPledge/Register/TeamCaptain/3174-MultiPledgeRegisterTeamCaptainMR.spec';
import './MultiPledge/Register/TeamMember/3187-MultiPledgeRegisterTeamMemberMR.spec';
import './MultiPledge/Register/Volunteer/3012-MultiPledgeRegisterVolunteerAllFieldsRequired.spec';
import './MultiPledge/Sponsor/656-MultiPledgeDonationToEvent.spec';
import './MultiPledge/Sponsor/3014-MultiPledgeDonationToParticipant.spec';
import './MultiPledge/Sponsor/657-MultiPledgeDonationToTeam.spec';
import './Donations/InHonour/7115-InHonourOneTimeDonation.spec';
import './Donations/InHonour/7152-InHonourMonthlyDonation.spec';
import './Donations/InMemory/7147-InMemoryMonthlyDonationWithECard.spec';
import './Ticketing/2358-RegisterVolunteerAllFields.spec';
import './Ticketing/22-BuyTicketsAndLoginToManageAttendee.spec';
import './MultiPledge/RegItemByGroup/9025-MultiPledgeRegItemByGroupIndRegisterFree.spec';
import './MultiPledge/RegItemByGroup/9026-MultiPledgeRegItemByGroupCapRegisterFree.spec';
import './MultiPledge/RegItemByGroup/9027-MultiPledgeRegItemByGroupTeamRegisterFree.spec';
import './MultiPledge/Misc/PledgeVerifyGoogleAutofill.spec';
import './MultiPledge/Register/Individual/648.2-MultiPledgeRegisterAllFieldsRequiredExtraSpace.spec';
import './MultiPledge/Misc/DoubleCustomURL.spec'
import './MultiPledge/Misc/URLRedirection.spec'
import './SinglePledge/Register/Individual/SinglePledgeRegisterAllFieldsRequired.spec'
import './MultiPledge/Misc/PledgeVerifyGoogleAutofill.spec'


// Conditionally include files based on environment
if (environment === 'PROD') {
    import('./MultiPledge/Misc/DomainMaskingValidation.spec');
}