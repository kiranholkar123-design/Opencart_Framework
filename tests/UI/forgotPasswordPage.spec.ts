import { test, expect } from "../../src/fixtures/baseFixture";
import { MESSAGES } from "../../src/constants/messages"
import * as CONSTANTS from "../../src/constants/index"


test.beforeEach(async ({ NALab, cred }) => {
    await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage);
    await NALab.loginPage.navigateToForgotPasswordPage();
})

test('TC_01 [Forgot Password Page] | ForgotPwd_RegisteredEmail_SuccessMsg_Verification', async ({ NALab, testData }) => {
    await NALab.forgotPasswordPage.submitForgotPasswordForm(testData.basicInfo.registeredEmail);
    expect.soft(await NALab.loginPage.getLoginPageTitle()).toBe(MESSAGES.loginPage.pageTitle);
    await expect.soft(NALab.forgotPasswordPage.successMessage).toHaveText(MESSAGES.forgotPassword.resetLinkSent)

})

test('TC_02 [Forgot Password Page] | ForgotPwd_UnregisteredEmail_WarningMsg_Verification', async ({ NALab, testData }) => {
    await NALab.forgotPasswordPage.submitForgotPasswordForm(testData.basicInfo.unregisteredEmail);
    await expect(NALab.forgotPasswordPage.warningMessage).toHaveText(MESSAGES.forgotPassword.emailNotFound)
    let uniqueEmail = await testData.basicInfo.email('kirantest');
    console.log(uniqueEmail);
})

