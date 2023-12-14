class featureFlagPage {

    featureFlagMenu = '[name="feature-flags"]';
    
    async navigatToFeatureFlagScreen(page) {
        await page.locator(this.featureFlagMenu).click();
    }

}

module.exports = new featureFlagPage()