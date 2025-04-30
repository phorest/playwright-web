import { faker } from '@faker-js/faker/locale/en';
export const testClient = {
    NOTES: 'Test Notes',
    FIRST_NAME: 'Istvan',
    LAST_NAME: 'Gercsak',
    GENDER: 'Male',
    PHONE_NUMBER: '0891234567',
    LANDLINE: '0891234567',
    EMAIL: faker.internet.exampleEmail(),
    BIRTH_YEAR: '1988',
    BIRTH_MONTH: 'December',
    BIRTH_DAY: '30',
    MARKETING_PERMISSION_BY_EMAIL: true,
    MARKETING_PERMISSION_BY_SMS: true,
    APPOINTMENT_REMINDER_BY_EMAIL: true,
    APPOINTMENT_REMINDER_BY_SMS: true,
    CLIENT_CATEGORY: '',
    PREFERRED_STAFF_MEMBER: '',
    WHERE_DID_THEY_HERE_FROM_US: 'Google',
    REFERRED_BY: '',
    CLIENT_ID: '',
    PROMPT_ON_CLIENT_NOTES: true,
    PROMPT_ON_APPOINTMENT_NOTES: true,
    ADDRESS_LINE_1: 'ADDRESS_LINE_1',
    ADDRESS_LINE_2: 'ADDRESS_LINE_2',
    TOWN_CITY: "TOWN_CITY",
    COUNTRY_STATE_REGION: "COUNTRY_STATE_REGION",
    ZIP_POSTCODE: "ZIP_POSTCODE",
    COUNTRY: "Ireland"
}

export const testInput =
{
        "firstName": "Istvan",
        "lastName": "Gercsak",
        "gender": "MALE",
        "email": faker.internet.exampleEmail(),
        "mobile": "0891234567",
        "landLine": "0891234567",
        "notes": "Test Notes",
        "marketingEmailOptout": false,
        "marketingSmsOptout": false,
        "shouldPromptClientNotes": true,
        "shouldPromptAppointmentNotes": true,
        "externalId": "TestClientId",
        "dateOfBirth": "1988-12-30",
        "clientCategoryIds": [
            "W-1OmZCG-ee6KHEaueIEqA",// Local Staff
            "3MMooU72R9qSERzNlm-UxQ"// Professional No Children
        ],
        "referringClientId": "IKUSE2N0hUGOmYNoFqGf4Q", // test walsh
        "clientSourceId": "O1mNsY6iiDDctfaYf1lD-g", //
        "preferredStaffId": "nqtBpGfocH-K_Fcga6vS8g", //
        "linkedClientId": null,
        "awardReferralPoints": false,
        "address": {
            "streetAddress1": "ADDRESS_LINE_1",
            "streetAddress2": "ADDRESS_LINE_2",
            "city": "TOWN_CITY",
            "state": "COUNTRY_STATE_REGION",
            "postalCode": "ZIP_POSTCODE",
            "countryCode": "IE"
        }
}
