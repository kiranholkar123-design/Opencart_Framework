

import { test, expect, Locator } from "../../src/fixtures/baseFixture";
import { MESSAGES } from "../../src/constants/messages"
import { Page } from "@playwright/test";


// test.beforeEach(async ({ NALab, cred }) => {
//     await NALab.auth.loginPage.goToLoginPage(cred.baseUrl!);
//     await NALab.auth.loginPage.navigateToForgotPasswordPage();
// })

test('multiple tab handling', async ({ NALab, testData }) => {

    await NALab.auth.loginPage.goToLoginPage('https://orangehrm.com/contact-sales')
    let triggerLinks: Locator[] = await NALab.auth.loginPage.getAllLinks();
    let newpages: Page[] = await NALab.auth.loginPage.openMultipleTab(triggerLinks)

    await NALab.auth.loginPage.switchToTab(newpages[0]!)
    await newpages[0]?.title();
    console.log(await newpages[0]?.title());
    await NALab.auth.loginPage.closeTab(newpages[0]!);
})