const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/home.page.js');
const ContactPage = require('../page-objects/contact.page.js');
const testData = require('../test-data/testdata.json');
const ShopPage = require('../page-objects/shop.page.js');
const BASE_URL = "http://jupiter.cloud.planittesting.com";


test.describe('Contact Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

test('Error validation when mandatory fields not entered ', async ({ page }) => {

    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.goToContactPage();
    await contactPage.clickSubmit();

    await contactPage.verifyErrorsVisible();

    await contactPage.fillMandatoryFields(
      testData.singleTestData.name,
      testData.singleTestData.email,
      testData.singleTestData.message
    );

    await contactPage.verifyErrorsGone();
  });

/*test.describe('Contact Page testing 5 times ', () => {
  const testData = [ { name: 'Tester1',  email: 'tester1@mail.com', message: 'Hello tester1' },
                     { name: 'Tester2',  email: 'tester2@mail.com', message: 'Hello tester2' },
                     { name: 'Tester3',  email: 'tester3@mail.com', message: 'Hello tester3' },
                     { name: 'Tester4',  email: 'tester4@mail.com', message: 'Hello tester4' },
                     { name: 'Tester5',  email: 'tester4@mail.com', message: 'Hello tester5' }
  ];
  */
  
  testData.multiTestData.forEach((data) => {
   test(`Submitting contact page with ${data.name}`, async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);
    await homePage.goToContactPage();
// Submit mandatory fields each iteration
    await contactPage.fillMandatoryFields(
    data.name,
    data.email,
    data.message
    );

    await contactPage.clickSubmit();
    /*modal popup loader appears before the success message 
    appears so handling UI state to change */

    await contactPage.waitForLoaderToDisappear();   
    await contactPage.verifySuccessMessage();
  });
});
});
//});




