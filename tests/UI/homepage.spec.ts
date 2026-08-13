import { expect, test } from "../../src/fixtures/baseFixture";
import { MESSAGES as messages } from "../../src/constants/messages";

let username = 'kiranholkar345@gmail.com'
let password = 'kiran@2305'

test.beforeEach(async ({ NALab, cred }) => {
    await NALab.auth.loginPage.goToLoginPage(cred.baseUrl!);
    await NALab.auth.loginPage.doLogin(cred.testUserEmail, cred.testUserPass);
})

test.afterEach(async ({ NALab }) => {
    await NALab.dashboard.homePage.doLogOut();
})

test('TC 01_UI_AccountPage_TitleVisibility', async ({ NALab }) => {
    const allHeaders = await NALab.dashboard.homePage.getHomePageHeaders();
    console.log(allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toContain("My Account")
    expect.soft(allHeaders).toEqual(messages.homePage.allHeaders)
})