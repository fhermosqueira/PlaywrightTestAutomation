import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class AddElementPage extends BasePage {
    readonly addElementButton: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        super(page);     
        this.addElementButton = page.getByRole('button', { name: 'Add Element' });
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async goToAddElementPage() {
        await this.page.goto('/add_remove_elements/');
    }

    async clickAddElementButton() {
        await this.addElementButton.click();
    }

    async clickDeleteButton() {
        await this.deleteButton.click();
    }
}