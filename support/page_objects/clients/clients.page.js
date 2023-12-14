class clientsPage {

    clientsMenuId = "#main-nav-clients-link";

    async navigatToClientsScreen(page) {
        await page.locator(this.clientsMenuId).click();
    }

}

module.exports = new clientsPage()