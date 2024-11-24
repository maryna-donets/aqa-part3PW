import { test as base, expect, Page, chromium } from "@playwright/test";
import fs from 'fs';

export const test =
	base.extend <
	{ garagePage: Page } >
	({
		garagePage: async ({}, use) => {
			const browser = await chromium.launch();
			const context = await browser.newContext({
				storageState: "playwright/.auth/user.json",
			});
			const page = await context.newPage();

			const storageState = JSON.parse(fs.readFileSync("playwright/.auth/user.json", "utf-8"));
      
      const cookies = storageState.cookies;
      const specificCookie = cookies.find(cookie => cookie.name === 'sid');
      
      if (specificCookie) {
        console.log('Cookie "sid":', specificCookie);
      }
			await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');
			await use(page);
			await browser.close();
		}
	})

export { expect } from "@playwright/test";
