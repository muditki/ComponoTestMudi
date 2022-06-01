
class LoginPage {

    constructor(page) {
        this.page = page;
        this.email = page.locator('[placeholder="yours\\@example\\.com"]');
        this.password = page.locator('[placeholder="your password"]');
        this.loginIn = page.locator('[aria-label="Log In"]');

    }

    async goToURL(url) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.goto(url)
        ])
        await this.page.waitForLoadState('networkidle');
    }


    async validLogin(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);

        await Promise.all([
            this.page.waitForNavigation(),
            await this.loginIn.click()
        ])
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };