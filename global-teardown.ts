import { chromium } from "@playwright/test";
import * as CONSTANTS from "./src/constants/index";
import { ENV } from "./config/evn.loader";

function log(step: string, user?: string) {
    const userTag = user ? `[${user}] ` : '';
    console.log(`${userTag}${step}`);
}

async function logoutFromNALab(storagePath: string) {
    log('Starting logout', storagePath);

    const browser = await chromium.launch({ channel: 'chrome', headless: process.env.CI ? true : false });
    const context = await browser.newContext({ storageState: storagePath });
    const page = await context.newPage();

    const url = `${ENV.baseUrl}${CONSTANTS.URL.myAccount}`; // or wherever a logged-in session lands
    await page.goto(url);

    await page.getByRole('link', { name: 'Logout' }).click(); // adjust selector to your actual logout flow
    log('Logout submitted', storagePath);

    await browser.close();
    log(`Session closed: ${storagePath}`, storagePath);
}

async function globalTeardown() {
    log('>>>>>GLOBAL TEARDOWN STARTED');
    await Promise.all([
        logoutFromNALab('auth/ui/storageState/existingUserSession.json'),
        // logoutFromNALab('auth/ui/adminSession.json'),
    ]);
    log('>>>>>GLOBAL TEARDOWN COMPLETED');
}

export default globalTeardown;