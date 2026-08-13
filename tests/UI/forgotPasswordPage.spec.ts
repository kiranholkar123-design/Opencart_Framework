import { test, expect } from "../../src/fixtures/baseFixture";
import { MESSAGES } from "../../src/constants/messages"


test.beforeEach(async ({ NALab, cred }) => {
    await NALab.auth.loginPage.goToLoginPage(cred.baseUrl!);
    await NALab.auth.loginPage.navigateToForgotPasswordPage();
})

test('TC_01 [Forgot Password Page] | ForgotPwd_RegisteredEmail_SuccessMsg_Verification', async ({ NALab, testData }) => {
    await NALab.auth.forgotPasswordPage.submitForgotPasswordForm(testData.basicInfo.registeredEmail);
    expect.soft(await NALab.auth.loginPage.getLoginPageTitle()).toBe(MESSAGES.loginPage.pageTitle);
    await expect.soft(NALab.auth.forgotPasswordPage.successMessage).toHaveText(MESSAGES.forgotPassword.resetLinkSent)

})

test('TC_02 [Forgot Password Page] | ForgotPwd_UnregisteredEmail_WarningMsg_Verification', async ({ NALab, testData }) => {
    await NALab.auth.forgotPasswordPage.submitForgotPasswordForm(testData.basicInfo.unregisteredEmail);
    await expect(NALab.auth.forgotPasswordPage.warningMessage).toHaveText(MESSAGES.forgotPassword.emailNotFound)
    let uniqueEmail = await testData.basicInfo.email('kirantest');
    console.log(uniqueEmail);
})

