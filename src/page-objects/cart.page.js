const BasePage = require('./base.page');
const { expect } = require('@playwright/test');

class CartPage extends BasePage {
    constructor(page) {
    super(page);
    this.page = page;
    this.tableheader = () => this.page.locator('table th');
    this.tablerow = () => this.page.locator('.cart-items tbody tr'); 
  }

  async getDetailsFromCart()
  { 
     await this.waitForVisible(this.tablerow().first()); 
     const rows = await this.getRowCount(this.tablerow());//count();
     const {priceIndex, quantityIndex, subTotalIndex} = await this.getHeaderIndexes(this.tableheader());
     let finalTotal = 0; 
     const cartItems = [];

    for (let i = 0; i < rows ; i++ )
          {
    const row = this.tablerow().nth(i);
    
    const productName = (await row.locator('td').first().textContent()).trim();
    const price =  parseFloat((await row.locator('td').nth(priceIndex).textContent()).replace(/[^0-9.]/g, ''));
    const quantity = parseInt(await row.locator('input').inputValue());
    const subTotal = parseFloat((await row.locator('td').nth(subTotalIndex).textContent()).replace(/[^0-9.]/g, ''));
      cartItems.push({
      productName,
      price,
      quantity,
      subTotal
    });
     finalTotal += subTotal;
  }
 return {
    cartItems,
    finalTotal
  };
}
}
module.exports = CartPage;


