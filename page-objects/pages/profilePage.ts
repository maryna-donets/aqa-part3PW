import { expect, type Locator, type Page } from '@playwright/test';
import { SignInForm } from '../forms/signInForm'
import { users } from '../../test-data/users';

export class ProfilePage {
    readonly page: Page;
    readonly editProfileButton: Locator;
    readonly profileName: Locator;


    constructor(page: Page) {
        this.page = page;
        this.editProfileButton = page.getByRole('button', { name: 'Edit profile'});
        this.profileName = page.locator('.profile_name.display-4')
    }

    async getProfileName(){
        return await this.profileName.textContent();
    }

    async open() {
        await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/api/users/profile');
    }

    async openAsLoggedUser(email: string, password: string) {
        const signInForm = new SignInForm(this.page);
        await signInForm.open();
        await signInForm.loginWithCredentials(email, password);
        await expect(this.page.locator('h1')).toHaveText('Garage');
    }

    async clickEditProfileButton() {
        await this.editProfileButton.click();
    }
}