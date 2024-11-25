import { test, expect } from '@playwright/test';
import { ProfilePage } from '../../page-objects/pages/profilePage';
import { users } from '../../test-data/users';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Profile test with POM', () => {
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        profilePage = new ProfilePage(page);
        await page.goto('/');
    })

    test('Verify profile', async ({ page }) => {
        const testData =
        {
            "status": "ok",
            "data": {
                "userId": 253702,
                "photoFilename": "default-user.png",
                "name": "Jane1",
                "lastName": "Dou"
            }
        }

        await page.route('**/api/users/profile', route => route.fulfill({
            status: 200,
            body: JSON.stringify(testData),
        }));
        
        await profilePage.openAsLoggedUser(users.user1.email, users.user1.password);
        await page.goto('/panel/profile');
        await expect(profilePage.editProfileButton).toBeVisible;
        const name = await profilePage.getProfileName()
        expect(name).toBe(`${testData.data.name} ${testData.data.lastName}`)
        await page.pause();
    })
})
