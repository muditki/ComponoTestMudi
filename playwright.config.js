const config = {   // config object 
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000, // how much time test should wait 
  expect: {
    /**
     * Maximum time expect() should wait for th e condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30000
  },
  reporter: 'html',
  use: {  // use property what ever u declare here test cases will read it 
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
};

module.exports = config
