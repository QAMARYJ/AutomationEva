import { Page, Locator, expect } from '@playwright/test';

export class ShopPage {
  readonly page: Page;

  readonly addToCartButton: Locator;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly cvvInput: Locator;
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly countryOption: Locator;
  readonly placeOrderButton: Locator;
  readonly orderPlacedLabel: Locator;
  readonly orderSuccessMessage: Locator;
  readonly downloadOrderDetailsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: ' Add To Cart' });
    this.cartButton = page.getByRole('button', { name: '   Cart' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout❯' });
    this.cvvInput = page.locator('input.input.txt').nth(1);
    this.nameInput = page.locator('input.input.txt').nth(2);
    this.countryInput = page.getByPlaceholder('Select Country');
    this.countryOption = page.locator('.ta-item.list-group-item');
    this.placeOrderButton = page.getByText('Place Order');
    this.orderPlacedLabel = page.getByLabel('Order Placed Successfully');
    this.orderSuccessMessage = page.locator('.hero-primary');
    this.downloadOrderDetailsButton = page.locator('.btn.btn-primary.mt-3.mb-3');

  }

  //ADDING TO CART 
  async addFourthProductToCart() {
    await this.addToCartButton.nth(3).click();
  }

  async goToCart() {
    await this.cartButton.click();
  }

  //cHECKOUT PROCESS
  async checkout() {
    await this.checkoutButton.click();
  }

async fillAddress(zip: string, name: string) {
  await this.cvvInput.fill(zip);
  await this.nameInput.fill(name);
}


async selectCountry() {
  //SELECTING COUNTRY
  
    await this.countryInput.type('ph', { delay: 3000 });
    const countryOption = this.page.getByRole('button', { name: /Philippines/ });
    await expect(countryOption).toBeVisible();

    await countryOption.click();

}

  async placeOrder() {
    //PLACE ORDER
    await expect(this.placeOrderButton).toBeEnabled();
    await this.placeOrderButton.click();
  }

 async downloadOrderDetails() {
  // DOWNLOAD ORDER DETAILS
  
    await this.downloadOrderDetailsButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.downloadOrderDetailsButton).toBeEnabled();

    await this.downloadOrderDetailsButton.click();
}
}