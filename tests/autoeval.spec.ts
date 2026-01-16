import { test, expect } from '@playwright/test';
import { LoginPage } from '../common/pageObject/loginPage';
import { ShopPage } from '../common/pageObject/ShopPage';

test('Shop Process', async ({ page }) => {
  // lOGIN PROCESS
  const loginPage = new LoginPage(page);
  await loginPage.navigate(); 
  await loginPage.login('automationacc007@mailinator.com', 'Aut007@a'); 

  // SHOP PROCESS FLOW
  const shopPage = new ShopPage(page);

  // ADDING ITEM TO CART
  await shopPage.addFourthProductToCart();
  await shopPage.goToCart();

  // CHECKOUT PROCESS
  await shopPage.checkout();
  await shopPage.fillAddress('123', 'John Doe');
  await shopPage.selectCountry(); 

  // PLACING ORDER
  await shopPage.placeOrder();
  await expect(shopPage.orderSuccessMessage).toBeVisible();

  // DOWNLOAD ORDER DETAILS
  await shopPage.downloadOrderDetails();
});