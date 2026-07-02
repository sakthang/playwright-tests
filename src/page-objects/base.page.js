const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async click(element) {
    await element.click();
  }

 /* async jsclick(element)
  {
    await element.evaluate(el => el.click());
  }
*/


  async fill(element, value) {
    await element.fill(value);
  }

  async clearAndFill(element, value) {
    await element.fill('');
    await element.fill(value);
  }

  async expectVisible(element) {
    await expect(element).toBeVisible();
  }

  async expectHidden(element) {
    await expect(element).toBeHidden();
  }

  async getRowCount(element)
  {
    return await element.count();
  }

 async getHeaderIndexes(element)
 {
 const headerTexts =  await element.allTextContents();
 return {
    priceIndex: headerTexts.indexOf('Price'),
    quantityIndex: headerTexts.indexOf('Quantity'),
    subTotalIndex: headerTexts.indexOf('Subtotal')
  }
 } 
  async expectText(element, text) {
    await expect(element).toHaveText(text);
  }

  async waitForVisible(element) {
    await element.waitFor({ state: 'visible' });
  }

  async convertTxtToFloat(element)
  {
    return await parseFloat(element.replace(/[^0-9.]/g, ''));
  }
}
module.exports = BasePage;
