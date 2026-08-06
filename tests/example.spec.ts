import { expect } from '@playwright/test';
import { test } from '../fixtures/pages';


test('succesful login', async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  await expect(loginPage.page.getByText('You logged into a secure area')).toBeVisible();

})


const invalidLoginCases = [
  { 
    description: 'usuario incorrecto', 
    username: 'usuarioMalo', 
    password: 'SuperSecretPassword!',
    expectedError: 'Your username is invalid!' 
  },
  { 
    description: 'password incorrecto', 
    username: 'tomsmith', 
    password: 'SuperSecretPassword',
    expectedError: 'Your password is invalid!' 
  },
  { 
    description: 'campos vacíos', 
    username: " ", 
    password: " ",
    expectedError: 'Your username is invalid!' 
  },
];

for (const testCase of invalidLoginCases) {
  test(`login fallido: ${testCase.description}`, async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(testCase.username, testCase.password);
    await expect(loginPage.errorMessage).toContainText(testCase.expectedError);
  });
}


test('add element', async ({ addElementPage }) => {

  await addElementPage.goToAddElementPage();
  await addElementPage.clickAddElementButton();

  await expect(addElementPage.deleteButton).toBeVisible();

})


test('add and remove element', async ({ addElementPage }) => {

  await addElementPage.goToAddElementPage();
  await addElementPage.clickAddElementButton();
  await addElementPage.clickDeleteButton();

  await expect(addElementPage.deleteButton).not.toBeVisible();

})


test('succesful login and logout, then addelement', async ({ loginPage, addElementPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await loginPage.logOut();
  await addElementPage.goToAddElementPage();
  await addElementPage.clickAddElementButton();
  await addElementPage.clickDeleteButton();

  await expect(addElementPage.deleteButton).not.toBeVisible();


})