class marketingPage {

    marketingMenuId = '#main-nav-marketing-link';

    async navigatToMarketingScreen(page) {
        await page.locator(this.marketingMenuId).click();
    }

}

module.exports = new marketingPage()