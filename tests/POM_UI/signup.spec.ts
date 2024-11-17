import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

import SignUpPage from './pages/SignUpPage';
import RemovePage from './pages/RemovePage';

test.beforeEach(async ({ page }) => {
    const signupPageInstance = new SignUpPage(page);
    await signupPageInstance.navigate();
  });
test('Successful sign up', async ({ page }) => {
    const signupPageInstance = new SignUpPage(page);
    const removepageInstance = new RemovePage(page);
    await signupPageInstance.signup('Maryna','Test','aqa-maryna@test.com','Aqarty12!','Aqarty12!')
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    await removepageInstance.remove();
    await expect(page).toHaveURL('https://qauto.forstudy.space');
  });

 test('Not matching password', async ({ page }) => {
    const signupPageInstance = new SignUpPage(page);
    await signupPageInstance.fillIn('Maryna','Test','aqa-maryna@test.com','Aqarty12!','Aqart12!')
    await signupPageInstance.emailFocus();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    const errR = await signupPageInstance.passErrorM()
    await expect(errR).toBe('Passwords do not match')
  });

 test('Empty password', async ({ page }) => {
    const signupPageInstance = new SignUpPage(page);
    await signupPageInstance.emptyPas('Maryna','Test','aqa-maryna@test.com')
    await signupPageInstance.passFocus();
    await signupPageInstance.pass2Focus();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    const errR = await signupPageInstance.passE()
    await expect(errR).toBe('Password required')
  });

   test('Short password', async ({ page }) => {
    const signupPageInstance = new SignUpPage(page);
    await signupPageInstance.notrepeatPassw('Maryna','Test','aqa-maryna@test.com','sevenCh')
    await signupPageInstance.pass2Focus();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    const errR = await signupPageInstance.passI()
    await expect(errR).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
  });

  test('Long password', async ({ page }) => {
    const signupPageInstance = new SignUpPage(page);
    await signupPageInstance.notrepeatPassw('Maryna','Test','aqa-maryna@test.com','sixteenCharacter');
    await signupPageInstance.pass2Focus();
     await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    const errR = await signupPageInstance.passI()
    await expect(errR).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    const borderColor = await page.$eval('input[name="password"]', (element) =>
        getComputedStyle(element).borderColor
    );
    expect(borderColor).toBe('rgb(220, 53, 69)');
});

test('Short name and last name', async ({ page }) => {
    const signupPageInstance = new SignUpPage(page);
    await signupPageInstance.nameEnter('M');
    await signupPageInstance.lastNameFocus();
    await signupPageInstance.lastnameEnter('T');
    await signupPageInstance.emailFocus();
    const nameError = page.locator('input[name="name"]').locator('~ .invalid-feedback');
await expect(nameError).toHaveText('Name has to be from 2 to 20 characters long');
const lastNameError = page.locator('input[name="lastName"]').locator('~ .invalid-feedback');
await expect(lastNameError).toHaveText('Last name has to be from 2 to 20 characters long');
    const borderColor = await page.$eval('input[id="signupName"]', (element) =>
        getComputedStyle(element).borderColor
    );
    expect(borderColor).toBe('rgb(220, 53, 69)');

    await page.waitForSelector('input[id="signupLastName"]');

    const borderColor2 = await page.evaluate(() => {
      const element = document.querySelector('input[id="signupLastName"]');
      if (!element) return null;
      return getComputedStyle(element).borderColor;
  });
    expect(borderColor2).toBe('rgb(220, 53, 69)');
    await page.getByRole('button', { name: 'Register' }).isDisabled();
});