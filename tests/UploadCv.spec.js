const { test, expect } = require('@playwright/test')
const { debug } = require('console')
const { url } = require('inspector')
const { LoginPage } = require('../pageObjects/LoginPage')
const { UploadCV } = require('../pageObjects/UploadCV')
const { DeleteValues } = require('../pageObjects/DeleteValues')
let webContext

test.beforeAll(async ({ browser }) => {

  const context = await browser.newContext()
  const page = await context.newPage()
  const email = 'mkumari@gmail.com'
  const password = 'paZZ100word'
  const url = 'https://candidate--qa-exercise-may.reviews.compono.dev/'
  const loginpage = new LoginPage(page)

  await loginpage.goToURL(url)
  await loginpage.validLogin(email, password)

  await page.waitForLoadState('networkidle');
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" }); //store exsisting storage data
}
)


test('Upload CV docx format, verify prepopulated values, delete skills,qualifications and uploaded CV', async () => {

  const url = 'https://candidate--qa-exercise-may.reviews.compono.dev/'
  const page = await webContext.newPage();
  const loginpage = new LoginPage(page)
  const file = './fixtures/CV1.docx'
  const uploadcv = new UploadCV(page)

  await loginpage.goToURL(url)
  await uploadcv.uploadingCV(file)
}
)

test('Upload CV pdf format, verify prepopulated values, delete skills,qualifications and uploaded CV', async () => {

  const url = 'https://candidate--qa-exercise-may.reviews.compono.dev/'
  const page = await webContext.newPage();
  const loginpage = new LoginPage(page)
  const file = './fixtures/CV2.pdf'
  const uploadcv = new UploadCV(page)

  await loginpage.goToURL(url)
  await uploadcv.uploadingCV(file)
}
)

test.afterEach(async () => {

  const url = 'https://candidate--qa-exercise-may.reviews.compono.dev/'
  const page = await webContext.newPage();
  const loginpage = new LoginPage(page)
  const deletevalues = new DeleteValues(page)

  await loginpage.goToURL(url)
  await page.on('dialog', async dialog => {
    await dialog.accept()
  })

  await deletevalues.deleteexperienceandskills()
  await deletevalues.deletequalification()
  await deletevalues.deletecv()
})
