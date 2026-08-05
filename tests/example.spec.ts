import { expect } from '@playwright/test';
import { test } from '../fixtures/pages';
import { LoginPage } from '../pages/login-page';
import { AddElementPage } from '../pages/addelement-page';

//test.beforeAll(async ({page}) => {
//  await page.goto(URL)
//
//});

test('succesful login', async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  await expect(loginPage.page.getByText('You logged into a secure area')).toBeVisible();

})

test('add element', async ({ addElementPage }) => {

  await addElementPage.goToAddElementPage();
  await addElementPage.clickAddElementButton();

  await expect(addElementPage.deleteButton).toBeVisible();

});

