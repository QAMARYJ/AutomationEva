import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;
  readonly defaultUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.loginButton = page.locator('#login');
    this.logo = page.getByText('Ecom');
    this.defaultUrl = 'https://rahulshettyacademy.com/client/#/auth/login';
  }

   async navigate(url?: string) {
    await this.page.goto(url ?? this.defaultUrl, {
      waitUntil: 'domcontentloaded', 
    });
  }
  async verifyLoginPage() {
    await expect(this.page).toHaveURL(/auth\/login/);
  }

  async loginUser(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await Promise.all([
      this.loginButton.click()
    ]);
  }

  async login(username: string, password: string) {
  await this.navigate();
  await this.verifyLoginPage();
  await this.loginUser(username, password);

  await expect(this.page).toHaveURL(/client/);
}
}
