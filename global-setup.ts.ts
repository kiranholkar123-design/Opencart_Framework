import { chromium } from "@playwright/test";
import * as CONSTANTS from "./src/constants/index";
import { ENV } from "./config/evn.loader";

function log(step: string, user?: string) {
    const userTag = user ? `[${user}] ` : '';
    console.log(`${userTag}${step}`);
}

async function loginToNALab(email: string, password: string, storagePath: string) {
    log('Starting login', storagePath);

    const browser = await chromium.launch({ channel: 'chrome', headless: process.env.CI ? true : false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const url = `${ENV.baseUrl}${CONSTANTS.URL.loginPage}`;
    await page.goto(url);
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    log('Login submitted', storagePath);

    await page.context().storageState({ path: storagePath });
    log(`Storage state saved: ${storagePath}`, storagePath);

    await browser.close();
}

async function globalSetup() {
    log('>>>>>GLOBAL SETUP STARTED');
    await Promise.all([
        loginToNALab(ENV.testUserEmail, ENV.testUserPass, 'auth/ui/storageState/existingUserSession.json'),
        // loginToNALab(ENV.adminEmail, ENV.adminPass, 'auth/ui/adminSession.json'),
    ]);
    log('>>>>>GLOBAL SETUP COMPLETED');
}

export default globalSetup;