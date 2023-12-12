class loginPage{

    emailinput() { return '[name="email"]' }
    passwordInput() { return '[name="password"]' }
    signInButton() { return '#btn-save-cd-settings' }

}

module.exports = new loginPage()