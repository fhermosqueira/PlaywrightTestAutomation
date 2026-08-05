import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { AddElementPage } from '../pages/addelement-page';

type myFixtures = {
    loginPage: LoginPage;
    addElementPage: AddElementPage;
}

export const test = base.extend<myFixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    addElementPage: async ({ page }, use) => {
        await use(new AddElementPage(page));
    },
})

export { expect } from '@playwright/test'