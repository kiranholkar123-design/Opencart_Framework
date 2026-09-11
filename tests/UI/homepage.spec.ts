import { expect, test } from "../../src/fixtures/baseFixture";
import { MESSAGES as messages } from "../../src/constants/messages";
import * as CONSTANTS from "../../src/constants/index"


test.beforeEach(async ({ NALab, cred }) => {
    await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage);
    await NALab.loginPage.doLogin(cred.testUserEmail, cred.testUserPass);
})

test.afterEach(async ({ NALab }) => {
    await NALab.homePage.clickOnLogOut();
})

test('TC 01_UI_AccountPage_TitleVisibility', async ({ NALab }) => {
    const allHeaders = await NALab.homePage.getHomePageHeaders();
    console.log(allHeaders);
    console.log(allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toContain("My Account")
    expect.soft(allHeaders).toEqual(messages.homePage.allHeaders)
})