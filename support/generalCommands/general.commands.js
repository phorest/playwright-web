import featureflagPage from "../../support/page_objects/featureflag/featureflag.page"
import appointmentsPage from "../../support/page_objects/appointments/appointments.page"
import {expect} from "@playwright/test";

class generalCommands {
    // Login
    async loginAPI(page, request) {
        const response = await request.post(process.env.DEV_TOKEN_URL, {
            data: {
                "grant_type": "basic",
                "client_type": "user",
                "username": process.env.TESTUSER_USERNAME,
                "password": process.env.TESTUSER_PASSWORD
            }
        });
        await expect(response.ok()).toBeTruthy();
        await expect(response.status()).toBe(200);
        let responseJSON = await response.json();
        let tokenValue = responseJSON.access_token;

        await page.evaluate(tokenValue => localStorage.setItem('access-token', tokenValue), tokenValue)

        await page.goto(process.env.DEV_BASE_URL);
        await this.checkRevisionKey(page);
    }

    // Turn on feature flags
    async turnOnFeatureFlag(page, devFeatureFlags) {
        await featureflagPage.navigatToFeatureFlagScreen(page);

        for (const index in devFeatureFlags) {
            await page.getByLabel(devFeatureFlags[index]).check();
        }
        await this.checkRevisionKey(page);
    }

    async checkRevisionKey(page) {
        let revisionKey = "";
        if (!revisionKey) {
            await appointmentsPage.navigatToAppointmentsScreen(page);
        } else {
            await page.goto(process.env.DEV_BASE_URL + '/?revision=' + revisionKey);
        }
    }

    async scrollIntoViewIfNeeded(page, locatorID){
        await page.locator(locatorID).scrollIntoViewIfNeeded();
    }

    async clickOnAButtonByName(page, locatorID) {
        await page.locator(locatorID).click();
    }

    async fillInputByLabel(page, locatorID, input) {
        await page.getByLabel(locatorID).click();
        await page.getByLabel(locatorID).fill(input);
    }

    async fillInputByPlaceholder(page, locatorID, input) {
        await page.getByPlaceholder(locatorID).click();
        await page.getByPlaceholder(locatorID).fill(input);
    }
    async fillInputByLabelExactTrue(page, locatorID, input) {
        await page.getByLabel(locatorID, {exact: true}).click();
        await page.getByLabel(locatorID, {exact: true}).fill(input);
    }

    async fillInputById(page, locatorID, input) {
        await page.locator(locatorID).click();
        await page.locator(locatorID).fill(input);
    }

    async pickFromDropdown(page, locatorID, option) {
        await page.getByLabel(locatorID).click();
        await page.getByText(option, { exact: true }).click();
    }

}

module.exports = new generalCommands()
