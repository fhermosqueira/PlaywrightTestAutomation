import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly wrongUsernameMessage: Locator;
    readonly wrongPasswordMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: ' Login' });
        this.wrongUsernameMessage = page.getByText('Your username is invalid!');
        this.wrongPasswordMessage = page.getByText('Your password is invalid!');
        this.errorMessage = this.errorMessage = page.locator('#flash');
    }

    async goToLoginPage() {
        
        await this.page.goto('/login');
    }

    async login(username: string, password: string) {
        
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }

    async logOut() {
        await this.page.getByRole('link', { name: 'Logout' }).click();
        
    }

};