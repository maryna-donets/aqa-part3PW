import { test as setup, expect, chromium } from "@playwright/test";

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
	
	await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
	await page.getByRole("button", { name: "Sign in" }).click();
	await page.locator('[id="signinEmail"]').fill("marynatest@test.com");
	await page.locator('[id="signinPassword"]').fill("Qwerty12345");
	await page.getByLabel("Remember me").check();
	await page.getByRole("button", { name: "Login" }).click();
	await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');

	await page.context().storageState({ path: authFile });
	
});
