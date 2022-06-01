
const { expect } = require("@playwright/test");


class UploadCV {

    constructor(page) {
        this.page = page
        this.uploadcv = page.locator("text=Upload CV")
        this.uploadyourcv = page.locator('[data-test-id="upload-dialog"] >> text=Upload your CV')
        this.uploadingProgress = page.locator('text=Uploading...')
        this.uploadDialog = page.locator('[data-test-id="upload-dialog"]')
        this.closeBtton = page.locator('.CloseIconButton-sc-19wgu2s-0')
        this.uploadedIcon = (page.locator('text=CV/Resume Upload >> svg'))
        this.ExperienceSkills = page.locator('text=Experience and Skills Needs reviewEditEdit >> a')
        this.title1 = page.locator("h2.H2-sc-3k7wsu-0.huwDcl").nth(0)
        this.company1 = page.locator("h3.H3-sc-1f2idct-0.iQVOHt").nth(0)
        this.commenced1 = page.locator("span.Body-vq07tq-0.fzbHwb").nth(0)
        this.title2 = page.locator("h2.H2-sc-3k7wsu-0.huwDcl").nth(1)
        this.company2 = page.locator("h3.H3-sc-1f2idct-0.iQVOHt").nth(1)
        this.commenced2 = page.locator("span.Body-vq07tq-0.fzbHwb").nth(5)
    }


    async uploadingCV(file) {

        await this.uploadcv.click();

        const [fileChooser] = await Promise.all([          // call waitForEvent before click to set up waiting.                                    
            this.page.waitForEvent('filechooser'),         // Opens the file chooser.
            this.uploadyourcv.click(),
        ]);
        await fileChooser.setFiles(file);
        await expect(this.uploadingProgress).toBeVisible()
        await expect(this.uploadingProgress).toBeHidden()
        await expect(this.uploadDialog).toContainText('Your CV has been uploaded, and your profile has been prefilled!');
        await this.closeBtton.click();
        await expect(this.uploadedIcon).toBeVisible();

        await Promise.all([
            this.page.waitForNavigation(),
            await this.ExperienceSkills.click()
        ])

        //Validating pre populated values 
        await expect(this.title1).toContainText('QA Engineer');
        await expect(this.company1).toContainText('Coates Group');
        await expect(this.commenced1).toContainText('Oct 2019 – Present');

        await expect(this.title2).toContainText('Associate software engineer');
        await expect(this.company2).toContainText('Expedia');
        await expect(this.commenced2).toContainText('Aug 2018 – Sep 2019');
    }

}
module.exports = { UploadCV };







