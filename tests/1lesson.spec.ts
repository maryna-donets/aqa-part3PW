import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });
test('Successful sign up', async ({ page }) => {
    await page.locator('[id="signupName"]').fill('Maryna');
    await page.locator('[id="signupLastName"]').fill('Test');
    await page.getByLabel('Email').fill('aqa-maryna@test.com');
    await page.getByLabel('Password', { exact: true }).fill('Aqarty12!');
    await page.getByLabel('Re-enter password', { exact: true }).fill('Aqarty12!');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    await page.locator('.icon-settings').click();
    await page.getByRole('button', { name: 'Remove my account' }).click();
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page).toHaveURL('https://qauto.forstudy.space');
  });

  test('Not matching password', async ({ page }) => {
    await page.locator('[id="signupName"]').fill('Maryna');
    await page.locator('[id="signupLastName"]').fill('Test');
    await page.getByLabel('Email').fill('aqa-maryna@test.com');
    await page.getByLabel('Password', { exact: true }).fill('Aqarty12!');
    await page.getByLabel('Re-enter password', { exact: true }).fill('Aqart12!');
    await page.getByRole('button', { name: 'Register' }).isDisabled();
    await page.getByLabel('Email').focus();
    await expect(page.locator('.invalid-feedback')).toHaveText('Passwords do not match')
  });

  test('Empty password', async ({ page }) => {
    await page.locator('[id="signupName"]').fill('Maryna');
    await page.locator('[id="signupLastName"]').fill('Test');
    await page.getByLabel('Email').fill('aqa-maryna@test.com');
    await page.getByLabel('Password', { exact: true }).focus();
    await page.getByLabel('Re-enter password', { exact: true }).focus();
    await page.getByRole('button', { name: 'Register' }).isDisabled();
    await expect(page.locator('.invalid-feedback')).toHaveText('Password required')
  });

  test('Short password', async ({ page }) => {
    await page.locator('[id="signupName"]').fill('Maryna');
    await page.locator('[id="signupLastName"]').fill('Test');
    await page.getByLabel('Email').fill('aqa-maryna@test.com');
    await page.getByLabel('Password', { exact: true }).fill('sevenCh');
    await page.getByLabel('Re-enter password', { exact: true }).focus();
    await page.getByRole('button', { name: 'Register' }).isDisabled();
    await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  });

  test('Long password', async ({ page }) => {
    await page.locator('[id="signupName"]').fill('Maryna');
    await page.locator('[id="signupLastName"]').fill('Test');
    await page.getByLabel('Email').fill('aqa-maryna@test.com');
    await page.getByLabel('Password', { exact: true }).fill('sixteenCharacter');
    await page.getByLabel('Re-enter password', { exact: true }).focus();
    await page.getByRole('button', { name: 'Register' }).isDisabled();
    await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    const borderColor = await page.$eval('input[name="password"]', (element) =>
        getComputedStyle(element).borderColor
    );
    expect(borderColor).toBe('rgb(220, 53, 69)');
});

test('Short name and last name', async ({ page }) => {
    await page.locator('[id="signupName"]').fill('M');
    await page.locator('[id="signupLastName"]').focus();
    await page.locator('[id="signupLastName"]').fill('T');
    await page.getByLabel('Email').focus();
    const nameError = page.locator('input[name="name"]').locator('~ .invalid-feedback');
await expect(nameError).toHaveText('Name has to be from 2 to 20 characters long');
const lastNameError = page.locator('input[name="lastName"]').locator('~ .invalid-feedback');
await expect(lastNameError).toHaveText('Last name has to be from 2 to 20 characters long');
    const borderColor = await page.$eval('input[id="signupName"]', (element) =>
        getComputedStyle(element).borderColor
    );
    expect(borderColor).toBe('rgb(220, 53, 69)');
    const borderColor2 = await page.$eval('input[id="signupLastName"]', (element) =>
        getComputedStyle(element).borderColor
    );
    expect(borderColor2).toBe('rgb(220, 53, 69)');
    await page.getByRole('button', { name: 'Register' }).isDisabled();
});