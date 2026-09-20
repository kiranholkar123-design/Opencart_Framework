import { defineConfig, devices } from '@playwright/test';
import { ENV } from "./config/evn.loader"



export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup.ts.ts',
  globalTeardown: './global-teardown.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // default console reporter
    ["html", { outputFolder: "reports/html-report", open: "never" }],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true
    }]
  ],
  timeout: 1000 * 60 * 2,
  expect: {
    timeout: 5000 // ⏱️ default timeout for all expect() assertions
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: ENV.baseUrl,
    screenshot: 'on',
    actionTimeout: 30_000,
    navigationTimeout: 10_000,

    headless: process.env.CI ? true : false,
    video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'NALab_apiTests',
      testDir: './tests/API',
      use: {
      },
    },
    {
      name: 'NALab_uiTests',
      testDir: './tests/UI',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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

});
