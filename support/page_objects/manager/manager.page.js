class managerPage {

    managerMenuId = '#main-nav-manager-link';

    async navigatToManagerScreen(page) {
        await page.locator(this.managerMenuId).click();
    }

}

module.exports = new managerPage()