class generalCommands {
    // Login
    async login(page, request) {
        let revisionKey = "";

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

        if (!revisionKey) {
            await page.goto(process.env.DEV_BASE_URL)
        } else {
            await page.goto(process.env.DEV_BASE_URL + '/?revision=' + revisionKey)
        }
    }

    // Turn on feature flags
    async turnOnFeatureFlag(page, ffpage, devFeatureFlags) {
        await page.goto(ffpage);
        await page.waitForURL(ffpage);
        for (const index in devFeatureFlags) {
            await page.getByLabel(devFeatureFlags[index]).check();
        }
    }
}

module.exports = new generalCommands()