class appointmentsPage {

    appintmentMenuId = '#main-nav-appointments-link';
    
    async navigatToAppointmentsScreen(page) {
        await page.locator(this.appintmentMenuId).click();
    }

}

module.exports = new appointmentsPage()