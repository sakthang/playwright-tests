const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/home.page.js');

const testData = require('../test-data/testdata.json');
const ShopPage = require('../page-objects/shop.page.js');
const CartPage = require('../page-objects/cart.page.js');

const BASE_URL = "http://jupiter.cloud.planittesting.com";

test('Verify Cartpage subtotal and total for purchased items ', async ({ page }) => {

    const homePage = new HomePage(page);
    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigate(BASE_URL);
    await homePage.goToShopPage();

   for (const productToBuy of testData.product) {
    await shopPage.buyProduct(productToBuy.name, productToBuy.quantity);
  }
   await homePage.goToCartPage();
   
   const dataForAssertion = {
    "Teddy Bear": 12.99,
    "Fluffy Bunny": 9.99,
    "Valentine Bear": 14.99
   }

  const { cartItems, finalTotal } = await cartPage.getDetailsFromCart();

  for (const item of cartItems) {
    expect(item.price).toBeCloseTo(
      dataToAssert[item.productName],2);

    expect(item.subTotal).toBeCloseTo(
      item.price * item.quantity,2);
  }
   expect(finalTotal).toBeCloseTo(120.9, 2);
});
