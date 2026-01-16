import { Page } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';
import { ShopPage } from './pageObject/ShopPage';

export class PageManager {
  readonly loginPage: LoginPage;
  readonly ShopPage: ShopPage; 

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.ShopPage = new ShopPage(page); 
  }
}
