import BasePage from './base.page';

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.link_contactPage = () =>
      this.page.getByRole('link', { name: 'Contact' });

    this.link_shopPage = () =>
      this.page.getByRole('link', { name: 'Shop', exact: true });

    this.link_shopPage = () =>
      this.page.getByRole('link', { name: 'Shop', exact: true });

    this.link_cartPage = () => 
      this.page.getByRole('link', {name: 'Cart'});
    
  }

  async goToContactPage() {
    await this.click(this.link_contactPage());
  }

  async goToShopPage()
  {
        await this.click(this.link_shopPage());

  }

  async goToCartPage()
  {
     await this.click(this.link_cartPage());

  }
}
module.exports = HomePage;
