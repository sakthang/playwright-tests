const BasePage = require('./base.page');
const { expect } = require('@playwright/test');

class ShopPage extends BasePage {
    constructor(page) {
        super(page)
        this.btn_buyToy = (productName ) => this.page.locator('.product')
                                .filter({ hasText: productName  })  // filter the correct product card
                                .getByRole('link', { name: 'Buy' });
               
    }

async buyProduct(productName, quantity) {
for (let i = 0; i< quantity ; i ++ )
{
await this.click(this.btn_buyToy(productName));
}
}
}
module.exports = ShopPage;
  
