class purchasePage {

    purchaseMenuId = '#main-nav-purchase-link';

    async navigatToPurchaseScreen(page) {
        await page.locator(this.purchaseMenuId).click();
    }

}

module.exports = new purchasePage()