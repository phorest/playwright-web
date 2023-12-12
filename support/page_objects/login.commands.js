class loginCommands {

    emailinput = '[name="email"]'
    passwordInput = '[name="password"]';
    signInButton = '[name="sign-in-button"]';
    
    async login (page, testUserEmail, password) {
        await page.locator(this.emailinput).fill(testUserEmail);
        await page.locator(this.passwordInput).fill(password);
        await page.locator(this.signInButton).click();
      }
}

module.exports = new loginCommands()