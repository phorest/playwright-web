import featureflagPage from "../../support/page_objects/featureflag/featureflag.page"
import appointmentsPage from "../../support/page_objects/appointments/appointments.page"

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

}

module.exports = new generalCommands()