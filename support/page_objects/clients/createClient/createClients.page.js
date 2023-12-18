const { expect } = require('@playwright/test');
import generalCommands from "../../../generalCommands/general.commands"

class createClientsPage {

    clientsMenuId = "#main-nav-clients-link";
    addClientButton = '[name="add-client"]';
    notesInput = '#notes';
    marketingPermissionCheckboxByEmail = '[name="marketingEmailOptin"]';
    marketingPermissionCheckboxBySMS = '[name="marketingSmsOptin"]';
    firstNameInput = 'First Name';
    lastNameInput = 'Last Name';
    genderInputField = 'Gender';
    phoneNumber = 'Phone Number';
    landLine = 'Landline';
    email = 'Email';
    birthDay = 'Day';
    birthMonth = 'Month';
    birthYear = 'Year';
    promptOnClientNotesCheckbox = '[name="prompt-on-client-notes"]';
    promptOnAppointmentNotesCheckbox = '[name="prompt-on-appointment-notes"]'
    appointmentReminderByEmail = '[name="appointmentReminderEmailOptin"]';
    appointmentReminderBySMS = '[name="appointmentReminderSmsOptin"]';
    clientCategory = '';
    preferredStaffMember = '';
    whereDidTheyHearOfUs = '';
    referredBy = '';
    clientID = '';
    addressLineOne = 'Address line 1';
    addressLineTwo = 'Address line 2';
    townCity = 'Town / City';
    countyStateRegion = 'County / State / Region';
    zipPostcode = 'Zip / Postcode';
    saveButton = '[name="actions-bar-save-changes-button"]'

    async navigateToClientsScreen(page) {
        console.log("Navigate to Client screen")
        await page.locator(this.clientsMenuId).click();
    }

    async clickOnAddClientButton(page) {
        console.log("Click on add client button")
        await generalCommands.clickOnAButtonByName(page, this.addClientButton);
    }

    //Client Notes
    async fillNotes(page, text) {
        console.log("Fill Client Notes field");
        await generalCommands.fillInputById(page, this.notesInput, text);
    }

    //Basic Information
    async fillFirstName(page, text) {
        console.log("Fill first name field");
        await generalCommands.fillInputByLabel(page, this.firstNameInput, text);
    }

    async fillLastName(page, text) {
        console.log("Fill first last field");
        await generalCommands.fillInputByLabel(page, this.lastNameInput, text);
    }

    async pickGender(page, option) {
        if (option === 'Male') {
            console.log("Male gender picked");
            await generalCommands.pickFromDropdown(page, this.genderInputField, option);
        } else {
            console.log("Female gender picked");
            await generalCommands.pickFromDropdown(page, this.genderInputField, option);
        }
    }

    async fillPhoneNumber(page, input) {
        console.log("Fill phone number");
        await generalCommands.fillInputByLabel(page, this.phoneNumber, input);
    }

    async fillLandLine(page, input) {
        console.log("Fill landline");
        await generalCommands.fillInputByLabel(page, this.landLine, input);
    }

    async fillEmail(page, input) {
        console.log("Fill email");
        await generalCommands.fillInputByLabelExactTrue(page, this.email, input);
    }

    async fillBirthDay(page, input) {
        console.log("Fill birthday");
        await generalCommands.fillInputByPlaceholder(page, this.birthDay, input);
    }

    async pickBirthMonth(page, input) {
        console.log("Fill birth month");
        await generalCommands.pickFromDropdown(page, this.birthMonth, input);
    }

    async fillBirthYear(page, input) {
        console.log("Fill birth year");
        await generalCommands.fillInputByPlaceholder(page, this.birthYear, input);
    }

    //Notifications
    async marketingPermissionCheckboxByEmailIsChecked(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.marketingPermissionCheckboxByEmail);
        if (input === true) {
            expect(await page.isChecked(this.marketingPermissionCheckboxByEmail)).toBeTruthy();
        } else {
            expect(await page.isChecked(this.marketingPermissionCheckboxByEmail)).toBeFalsy();
        }
    }

    async setPermissionCheckboxByEmail(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.marketingPermissionCheckboxByEmail);
        // Default is false
        if (input === true) {
            await page.locator(this.marketingPermissionCheckboxByEmail).click();
        }
    }

    async marketingPermissionCheckboxBySMSIsChecked(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.marketingPermissionCheckboxBySMS);
        if (input === true) {
            expect(await page.isChecked(this.marketingPermissionCheckboxBySMS)).toBeTruthy();
        } else {
            expect(await page.isChecked(this.marketingPermissionCheckboxBySMS)).toBeFalsy();
        }
    }

    async setPermissionCheckboxBySMS(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.marketingPermissionCheckboxBySMS);
        // Default is false
        if (input === true) {
            await page.locator(this.marketingPermissionCheckboxBySMS).click();
        }
    }

    async appointmentReminderCheckboxByEmailIsChecked(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.appointmentReminderByEmail);
        if (input === true) {
            expect(await page.isChecked(this.appointmentReminderByEmail)).toBeTruthy();
        } else {
            expect(await page.isChecked(this.appointmentReminderByEmail)).toBeFalsy();
        }
    }

    async setAppointmentReminderCheckboxByEmail(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.appointmentReminderByEmail);
        // Default is true
        if (input === false) {
            await page.locator(this.appointmentReminderByEmail).click();
        }
    }

    async appointmentReminderCheckboxBySMSIsChecked(page, input) {
        if (input === true) {
            expect(await page.isChecked(this.appointmentReminderBySMS)).toBeTruthy();
        } else {
            expect(await page.isChecked(this.appointmentReminderBySMS)).toBeFalsy();
        }
    }

    async setAppointmentReminderCheckboxBySMS(page, input) {
        await page.locator(this.appointmentReminderBySMS).scrollIntoViewIfNeeded();
        // Default is true
        if (input === false) {
            await page.locator(this.appointmentReminderBySMS).click();
        }
    }

    //Set Client Settings
    async pickClientCategory(page, input) { }
    async pickPreferredStaffMember(page, input) { }
    async pickWhereDidTheyHereFromUS(page, input) { }
    async pickReferredBy(page, input) { }
    async fillClientID(page, input) { }

    //Set and check prompt
    async promptOnClientNotesIsChecked(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.promptOnClientNotesCheckbox);
        if (input === true) {
            expect(await page.isChecked(this.promptOnClientNotesCheckbox)).toBeTruthy();
        } else {
            expect(await page.isChecked(this.promptOnClientNotesCheckbox)).toBeFalsy();
        }
    }

    async setPromptOnClientNotes(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.promptOnClientNotesCheckbox);
        // Default is false
        if (input === true) {
            await page.locator(this.promptOnClientNotesCheckbox).click();
        }
    }

    async promptOnAppointmentNotesIsChecked(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.promptOnAppointmentNotesCheckbox);
        await page.locator(this.promptOnAppointmentNotesCheckbox).scrollIntoViewIfNeeded();
        if (input === true) {
            expect(await page.isChecked(this.promptOnAppointmentNotesCheckbox)).toBeTruthy();
        } else {
            expect(await page.isChecked(this.promptOnAppointmentNotesCheckbox)).toBeFalsy();
        }
    }

    async setPromptOnAppointmentNotes(page, input) {
        await generalCommands.scrollIntoViewIfNeeded(page, this.promptOnAppointmentNotesCheckbox);
        // Default is false
        if (input === true) {
            await page.locator(this.promptOnAppointmentNotesCheckbox).click();
        }
    }

    // Address Information
    async fillAddressLineOne(page, input) {
        console.log("Fill address line 1");
        await generalCommands.fillInputByLabel(page, this.addressLineOne, input)
    }

    async fillAddressLineTwo(page, input) {
        console.log("Fill address line 2");
        await generalCommands.fillInputByLabel(page, this.addressLineTwo, input)
    }

    async fillTownCity(page, input) {
        console.log("Fill Town/City");
        await generalCommands.fillInputByLabel(page, this.townCity, input)
    }

    async fillCountyStateRegion(page, input) {
        console.log("Fill County/State/Region");
        await generalCommands.fillInputByLabel(page, this.countyStateRegion, input)
    }

    async fillZipPostcode(page, input) {
        console.log("Fill Zip/Postcode");
        await generalCommands.fillInputByLabel(page, this.zipPostcode, input)
    }

    async pickCountry(page) {
        console.log("Pick a country");
        await page.getByRole('button', { name: 'Country' }).click();
        await page.locator('[name="country"]').fill('ireland');
        await page.getByRole('option', { name: 'Ireland' }).first().click();
    }

    async clickOnSaveButton(page) {
        console.log("Click on save client button")
        await generalCommands.clickOnAButtonByName(page, this.saveButton);
    }
}

module.exports = new createClientsPage()
