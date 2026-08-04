import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { AddElementPage } from '../pages/addelement-page';

//test.beforeAll(async ({page}) => {
//  await page.goto(URL)
//
//});

test('succesful login', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  await expect(page.getByText('You logged into a secure area')).toBeVisible();

})

test('add element', async ({ page }) => {

  const addElementPage = new AddElementPage(page);
  await addElementPage.goToAddElementPage();
  await addElementPage.clickAddElementButton();



  await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();

})

