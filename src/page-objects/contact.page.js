
const BasePage = require('./base.page');

class ContactPage extends BasePage {
  constructor(page) {
    super(page);

    // ✅ Form fields
    this.input_name = () =>
      this.page.getByRole('textbox', { name: 'forename' });

    this.input_email = () =>
      this.page.getByRole('textbox', { name: 'Email' });

    this.input_message = () =>
      this.page.getByRole('textbox', { name: 'Message' });

    // ✅ Submit button
    this.btn_submit = () =>
      this.page.getByRole('link', { name: 'Submit' });

    // ✅ Errors
    this.error_name = () =>
      this.page.getByText('Name is required');

    this.error_email = () =>
      this.page.getByText('Email is required');

    this.error_message = () =>
      this.page.getByText('Message is required');

    this.loader_modal = () =>
     this.page.locator('.popup.modal');

    // ✅ Success message
      this.success_message = () =>
      this.page.locator('.alert.alert-success');
  }

  async clickSubmit() {
    await this.click(this.btn_submit());
  }

  async fillMandatoryFields(name, email, message) {
    await this.fill(this.input_name(), name);
    await this.fill(this.input_email(), email);
    await this.fill(this.input_message(), message);
  }

  async verifyErrorsVisible() {
    await this.expectVisible(this.error_name());
    await this.expectVisible(this.error_email());
    await this.expectVisible(this.error_message());
  }

  async verifyErrorsGone() {
    await this.expectHidden(this.error_name());
    await this.expectHidden(this.error_email());
    await this.expectHidden(this.error_message());
  }

  
 async waitForLoaderToDisappear() {
  await this.loader_modal().waitFor({
    state: 'hidden',
    timeout: 20000
  });
}

  async verifySuccessMessage() {
    await this.expectVisible(this.success_message());
  }
}

module.exports = ContactPage;
