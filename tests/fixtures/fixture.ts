import { test as base, expect, Page, chromium } from "@playwright/test";


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
			//await page.goto(`${process.env.BASE_URL}panel/garage`);
			await page.goto('https://qauto.forstudy.space/panel/garage');
			await use(page);
			await browser.close();
		}
	})

export { expect } from "@playwright/test";
