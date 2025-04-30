class membershipPage {

    membershipsMenuId = '#memberships';

    async navigatToMembershipScreen(page) {
        await page.locator(this.membershipsMenuId).click();
    }

}

module.exports = new membershipPage()