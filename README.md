# ShortLyster RegressionTest

This is test automation repository for https://candidate.shortlyster.com/ based on Playwright framework.
Playwright enables reliable end-to-end testing for modern web apps.
It allows testing Chromium, Firefox and WebKit with a single API.



### Getting Started
Playwright runs on node.js platform 
#### Installations 
* Install node.js > [https://nodejs.org/en/download/] or [https://nodejs.org/en/download/package-manager/#macos]
* Install editor to run the project > [https://visualstudio.microsoft.com/]
* clone the repo   ```git clone https://github.com/muditki/ComponoTestMudi.git```
* Install playwright.  ```npx playwright install```

#### Run test on default settings 
```npx playwright test``` [default browser = chromium , headless ]

#### Run test on firefox
```npx playwright test --browser=firefox --headed```

#### Run test on headed mode 
```npx playwright test --headed```

#### Run test on debug mode 
```npx playwright test --debug```

#### Reports and screenshots 
Open last HTML report ```npx playwright show-report```

After each test failure screen shouts are captured and store under playwright report directory

### Useful links
https://playwright.dev/

