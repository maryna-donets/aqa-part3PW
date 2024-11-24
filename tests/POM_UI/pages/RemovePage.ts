import { test, expect } from '@playwright/test';

class RemovePage {
    settingsButton: any;
    removeButton: any;
    remove2Button: any;
    page: any;

    constructor(page) {
        this.page = page;
        this.settingsButton = page.locator('.icon-settings')
        this.removeButton = page.getByRole('button', { name: 'Remove my account' })
        this.remove2Button = page.getByRole('button', { name: 'Remove' })
    }

    async navigate() {

        await this.page.goto('https://qauto.forstudy.space/panel/garage');

    }

    async remove(){

        await this.settingsButton.click();
        await this.removeButton.click();
        await this.remove2Button.click();

    }
}

export default RemovePage;

