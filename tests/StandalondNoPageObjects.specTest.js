const { test, expect } = require('@playwright/test')
const exp = require('constants')
let webContext


test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://candidate--qa-exercise-may.reviews.compono.dev/');
  await expect(page).toHaveTitle("Sign In with Auth0");
  await page.locator('[placeholder="yours\\@example\\.com"]').fill('mkillangantilake@gmail.com');
  await page.locator('[placeholder="your password"]').fill('mudill*42');
  page.locator('[aria-label="Log In"]').click(),
    await page.waitForLoadState('networkidle');
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" }); //store exsisting storage data

}
)

test('Upload CV', async () => {
  const page = await webContext.newPage();

  await Promise.all([
    page.waitForNavigation(),
    page.goto('https://candidate--qa-exercise-may.reviews.compono.dev/')
  ])
  await page.locator('[placeholder="yours\\@example\\.com"]').fill('mkillangantilake@gmail.com');
  await page.locator('[placeholder="your password"]').fill('mudill*42');
  page.locator('[aria-label="Log In"]').click(),
    await page.waitForLoadState('networkidle');

  await Promise.all([
    page.waitForNavigation(),
    page.locator('[aria-label="Log In"]').click(),

  ])

  await page.locator("text=Upload CV").click();
  const [fileChooser] = await Promise.all([  // It is important to call waitForEvent before click to set up waiting.
    page.waitForEvent('filechooser'),  // Opens the file chooser.
    page.locator('[data-test-id="upload-dialog"] >> text=Upload your CV').click(),
  ]);

  await fileChooser.setFiles('./fixtures/CV2.pdf');
  await expect(page.locator('text=Uploading...')).toBeVisible();
  await expect(page.locator("text=Uploading...")).toBeHidden();
  await expect(page.locator('[data-test-id="upload-dialog"]')).toContainText('Your CV has been uploaded, and your profile has been prefilled!');
  await page.locator('.CloseIconButton-sc-19wgu2s-0').click();

  await expect(page.locator('text=CV/Resume Upload >> svg')).toBeVisible
  await page.locator('text=Experience and Skills Needs reviewEditEdit >> a').click();
  await expect(page).toHaveURL('https://candidate--qa-exercise-may.reviews.compono.dev/profile/experience-and-skills');

  //Validating pre populated values 
  await expect(page.locator("h2.H2-sc-3k7wsu-0.huwDcl").nth(0)).toContainText('QA Engineer');
  await expect(page.locator("h3.H3-sc-1f2idct-0.iQVOHt").nth(0)).toContainText('Coates Group');
  await expect(page.locator("span.Body-vq07tq-0.fzbHwb").nth(0)).toContainText('Oct 2019 – Present');

  await expect(page.locator("h2.H2-sc-3k7wsu-0.huwDcl").nth(1)).toContainText('Associate software engineer');
  await expect(page.locator("h3.H3-sc-1f2idct-0.iQVOHt").nth(1)).toContainText('Expedia');
  await expect(page.locator("span.Body-vq07tq-0.fzbHwb").nth(5)).toContainText('Aug 2018 – Sep 2019');

}
)

test('Delete Experience and skills', async () => {

  const page = await webContext.newPage();

  await Promise.all([
    page.waitForNavigation(),
    page.goto('https://candidate--qa-exercise-may.reviews.compono.dev/')
  ])
  await page.waitForLoadState('networkidle')


  await page.locator('[href="/profile/experience-and-skills"]').click();
  await expect(page).toHaveURL('https://candidate--qa-exercise-may.reviews.compono.dev/profile/experience-and-skills');
  await page.waitForLoadState('networkidle')

  const count = await (page.locator("h2.H2-sc-3k7wsu-0.huwDcl")).count(); // Get number of Experience and Skills 

  await page.on('dialog', async dialog => {
    await dialog.accept()
  })

  for (let i = 0; i < count; ++i) {
    await page.locator('button.ActionStyled-sc-od5jif-3.ezDNse').nth(0).click()
    await page.waitForTimeout(2000)
  }

  await page.locator('a:has-text("Back to profile")').click()
  await expect(page).toHaveURL('https://candidate--qa-exercise-may.reviews.compono.dev/profile');
  await page.waitForLoadState('networkidle')

  await page.locator('[class="SVGIcon-sc-1w8loah-0 kwJeya sc-1w8loah-1 StyledTrashIcon-sc-lkjdzb-0 gVnzNB"]').click();
  await page.waitForTimeout(2000)

}

)

test('Delete Qualifications', async () => {

  const page = await webContext.newPage();
  await Promise.all([
    page.waitForNavigation(),
    page.goto('https://candidate--qa-exercise-may.reviews.compono.dev/')
  ])
  await page.waitForLoadState('networkidle')

  await page.on('dialog', async dialog => {
    await dialog.accept()
  })
  await page.locator('[href="/profile/qualifications"]').click();
  await expect(page).toHaveURL('https://candidate--qa-exercise-may.reviews.compono.dev/profile/qualifications');
  await page.waitForLoadState('networkidle')

  const count = await (page.locator("h2.H2-sc-3k7wsu-0.huwDcl")).count(); // Get number of qulifications 
  for (let i = 0; i < count; ++i) {
    await page.locator('button.ActionStyled-sc-od5jif-3.ezDNse').nth(0).click()
    await page.waitForTimeout(2000)
  }

  await page.locator('a:has-text("Back to profile")').click()
  await expect(page).toHaveURL('https://candidate--qa-exercise-may.reviews.compono.dev/profile');
  await page.waitForLoadState('networkidle')

})