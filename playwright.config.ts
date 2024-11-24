import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Емуляція __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv(env:string){
  dotenv.config({path: path.resolve(__dirname, `.env.${env}`), override: true})
}
const env = process.env.NODE_ENV || 'develop';
loadEnv(env)

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: process.env.BASE_URL,

     httpCredentials: {
      username: process.env.HTTP_USER_NAME ?? 'test',
      password: process.env.HTTP_PASSWORD ?? 'test',
     },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'development',
      testMatch: '**/*.spec.ts',
      use: { 
        //baseURL: process.env.BASE_URL,
        screenshot: 'only-on-failure',
        headless: process.env.HEADLESS==='true',
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        storageState: 'playwright/.auth/user.json'
     },
     dependencies: ['setup'],
    },

    {
      name: 'production',
      testMatch: '**/*.spec.ts',
      use: { 
       // baseURL: process.env.BASE_URL,
        video: 'retain-on-failure',
        headless: process.env.HEADLESS==='false',
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json'
      },
      dependencies: ['setup'],
    },
    {
      name: 'test',
      testMatch: '**/*.spec.ts',
      use: { 
       baseURL: process.env.BASE_URL,
        video: 'retain-on-failure',
        ...devices['Desktop Chrome'],
      },
    },

    /*{
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
