import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';


//test.beforeAll(async ({page}) => {
//  await page.goto(URL)
//
//});

test('succesful login', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');


  // await page.goto(URL)
  //await page.getByRole('textbox', { name: 'Username' }).click();
  //await page.getByRole('textbox', { name: 'Username' }).fill('student');
  //await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  //await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  //await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('You logged into a secure area')).toBeVisible();

})

