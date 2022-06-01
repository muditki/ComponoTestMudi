const { expect } = require("@playwright/test");

class DeleteValues {
    constructor(page) {

        this.page = page
        this.expiandskills = page.locator('[href="/profile/experience-and-skills"]')
        this.countskills = page.locator("h2.H2-sc-3k7wsu-0.huwDcl")
        this.numitemstobedeleted = page.locator('button.ActionStyled-sc-od5jif-3.ezDNse')
        this.backtoprofilebtn = page.locator('a:has-text("Back to profile")')
        this.deletebtn = page.locator('[class="SVGIcon-sc-1w8loah-0 kwJeya sc-1w8loah-1 StyledTrashIcon-sc-lkjdzb-0 gVnzNB"]')
        this.qualification = page.locator('[href="/profile/qualifications"]')
        this.cv = page.locator('[class="SVGIcon-sc-1w8loah-0 kwJeya sc-1w8loah-1 StyledTrashIcon-sc-lkjdzb-0 gVnzNB"]')
    }

    async deleteexperienceandskills() {

        await this.expiandskills.click();
        await expect(this.page).toHaveURL('https://candidate--qa-exercise-may.reviews.compono.dev/profile/experience-and-skills');
        await this.page.waitForLoadState('networkidle')
        await this.page.waitForTimeout(1000)

        const count = await this.countskills.count() // Get number of Experience and Skills 
        console.log(count)
        for (let i = 0; i < count; ++i) {
            await this.numitemstobedeleted.nth(0).click()
            await this.page.waitForTimeout(2000)
        }
        await this.backtoprofilebtn.click();
        await expect(this.page).toHaveURL('https://candidate--qa-exercise-may.reviews.compono.dev/profile');
        await this.page.waitForLoadState('networkidle')
    }

    async deletequalification() {

        await this.qualification.click();
        await expect(this.page).toHaveURL('https://candidate--qa-exercise-may.reviews.compono.dev/profile/qualifications');
        await this.page.waitForLoadState('networkidle')
        await this.page.waitForTimeout(1000)
        const count = await this.countskills.count(); // Get number of qulifications 
        for (let i = 0; i < count; ++i) {
            await this.numitemstobedeleted.nth(0).click()
            await this.page.waitForTimeout(2000)
        }
        await this.backtoprofilebtn.click();
        await expect(this.page).toHaveURL('https://candidate--qa-exercise-may.reviews.compono.dev/profile');
        await this.page.waitForLoadState('networkidle')
    }

    async deletecv() {
        await this.cv.click();
        await this.page.waitForTimeout(2000)
    }

}
module.exports = { DeleteValues };
