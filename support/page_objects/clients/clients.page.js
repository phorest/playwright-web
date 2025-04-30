const { expect } = require('@playwright/test');
import generalCommands from "../../../support/generalCommands/general.commands"

class clientsPage {

    firstNameInput = 'First Name';
    clientsMenuId = "#main-nav-clients-link";
    async navigateToClientsScreen(page) {
        console.log("Navigate to Client screen")
        await page.locator(this.clientsMenuId).click();
    }
    async fillFirstNameSearchField(page, text) {
        await generalCommands.fillInputByPlaceholder(page, this.firstNameInput, text)
    }
    async clickOnFirstFinding(page, text){
        await page.getByRole('cell', { name: text }).click();
    }
}

module.exports = new clientsPage()
