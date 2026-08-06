import { expect } from '@playwright/test';
import { test } from '../fixtures/pages';


test('succesful login', async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  await expect(loginPage.page.getByText('You logged into a secure area')).toBeVisible();

})

test('add element', async ({ addElementPage }) => {

  await addElementPage.goToAddElementPage();
  await addElementPage.clickAddElementButton();

  await expect(addElementPage.deleteButton).toBeVisible();

})

test('incorrect username', async ({ loginPage }) => {

  await loginPage.goToLoginPage();
  await loginPage.login('fher', 'wrongpassword');

  await expect(loginPage.page.getByText('Your username is invalid!')).toBeVisible();

})

test('incorrect password', async ({ loginPage }) => {

  await loginPage.goToLoginPage();
  await loginPage.login('tomsmith', 'wrongpassword');

  await expect(loginPage.page.getByText('Your password is invalid!')).toBeVisible();

})

test('empty fields', async ({ loginPage }) => {

  await loginPage.goToLoginPage();
  await loginPage.login('', '');

  await expect(loginPage.page.getByText('Your username is invalid!')).toBeVisible();

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