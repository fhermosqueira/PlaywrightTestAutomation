import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class AddElementPage extends BasePage {
    readonly addElementButton: Locator;
    readonly deleteButton: Locator;

    // primero, los elements locators
    constructor(page: Page) {
        super(page);     
        this.addElementButton = page.getByRole('button', { name: 'Add Element' });
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async goToAddElementPage() {
        await this.page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    }

    // luego, las actions
    async clickAddElementButton() {
        await this.addElementButton.click();
    }

    
}