# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI/forgotPasswordPage.spec.ts >> TC_02 [Forgot Password Page] | ForgotPwd_UnregisteredEmail_WarningMsg_Verification
- Location: tests/UI/forgotPasswordPage.spec.ts:19:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('#account-forgotten > div.alert')
Expected: "Warning: The E-Mail Address was not found in our records, please try again!"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#account-forgotten > div.alert')

```

# Test source

```ts
  1  | import { test, expect } from "../../src/fixtures/baseFixture";
  2  | import { MESSAGES } from "../../src/constants/messages"
  3  | import * as CONSTANTS from "../../src/constants/index"
  4  | import { SessionProvider } from "../../auth/ui/sessionProvidor";
  5  | 
  6  | 
  7  | 
  8  | test('TC_01 [Forgot Password Page] | ForgotPwd_RegisteredEmail_SuccessMsg_Verification',
  9  |     async ({ createNALabSession, testData }) => {
  10 |         const NALab = await createNALabSession()
  11 |         await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage);
  12 |         await NALab.loginPage.navigateToForgotPasswordPage();
  13 |         await NALab.forgotPasswordPage.submitForgotPasswordForm(testData.basicInfo.registeredEmail);
  14 |         expect.soft(await NALab.loginPage.getLoginPageTitle()).toBe(MESSAGES.loginPage.pageTitle);
  15 |         await expect.soft(NALab.forgotPasswordPage.successMessage).toHaveText(MESSAGES.forgotPassword.resetLinkSent)
  16 | 
  17 |     })
  18 | 
  19 | test('TC_02 [Forgot Password Page] | ForgotPwd_UnregisteredEmail_WarningMsg_Verification',
  20 |     async ({ createNALabSession, testData }) => {
  21 |         const NALab = await createNALabSession()
  22 |         await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage);
  23 |         await NALab.loginPage.navigateToForgotPasswordPage();
  24 |         await NALab.forgotPasswordPage.submitForgotPasswordForm(testData.basicInfo.unregisteredEmail);
> 25 |         await expect(NALab.forgotPasswordPage.warningMessage).toHaveText(MESSAGES.forgotPassword.emailNotFound)
     |                                                               ^ Error: expect(locator).toHaveText(expected) failed
  26 |         let uniqueEmail = await testData.basicInfo.email('kirantest');
  27 |         console.log(uniqueEmail);
  28 |     })
  29 | 
  30 | 
```