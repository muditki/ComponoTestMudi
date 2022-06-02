# ShortLyster RegressionTest

This is test automation repository for https://candidate.shortlyster.com/ based on Playwright framework.
Playwright enables reliable end-to-end testing for modern web apps.
It allows testing Chromium, Firefox and WebKit with a single API.

### Test covers following areas
Upload different CV types, Verify pre-filled data on some fields, delete Qulification/skills and Delete CV

#### beforeAll hook 
beforeAll hook uses session storage:
Playwright provides a way to reuse the signed-in state in the tests. 
That way you can log in only once and then skip the log in step for all of the tests.

#### afterAll hook 
After each test this deletes uploaded CV and pre-filled data

<br/>

### Getting Started
Playwright runs on node.js platform 

#### Installations 
* Install node.js > [https://nodejs.org/en/download/] or [https://nodejs.org/en/download/package-manager/#macos]
* Install editor to run the project > [https://visualstudio.microsoft.com/]
* clone the repo   ```git clone https://github.com/muditki/ComponoTestMudi.git```
* Install playwright Test runner.  
```npm i -D @playwright/test```
``` ```

#### Run test on default settings 
```npx playwright test``` [default browser = chromium , headless ]

#### Run test on headed mode 
```npx playwright test --headed```

#### Run test on firefox
```npx playwright test --browser=firefox --headed```

#### Run test on debug mode 
```npx playwright test --debug```

#### Reports and screenshots 
Open last HTML report ```npx playwright show-report```

After each test failure screen shouts are captured and store under playwright report directory

### Useful Resources
* https://playwright.dev/
* https://www.udemy.com/share/106byY3@IwZeZ1RM8zXjNl70G9bE6pHtUHNd4FgtPg0c17R8lwFxywnLbly95nMvNaeqdiO8/



Notes: 
To run normal standalone test without page objects do following steps
* Rename StandalondNoPageObjects.specTest.js to StandalondNoPageObjects.spec.js
* Run ```npx playwright test --headed tests/StandalondNoPageObjects.spec.js```
