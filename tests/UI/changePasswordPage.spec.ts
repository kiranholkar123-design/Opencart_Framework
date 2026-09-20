import { test } from "../../src/fixtures/baseFixture";
import * as CONSTANTS from "../../src/constants/index"
import { constants } from "node:buffer";
import { assert } from "node:console";


test('Verify User Able to Change password',
    async ({ createNALabSession, cred, assert }) => {
        const NALab = await createNALabSession()

        await test.step('Launch the Login URL',
            async () => {
                await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage);
            }
        )

        await test.step('Login to the app',
            async () => {
                await NALab.loginPage.enterUsername(cred.testUserEmail);
                await NALab.loginPage.enterPassword(cred.testUserPass);
                await NALab.loginPage.clickOnLoginBtn();
                await NALab.homePage.waitForHomePageToLoad();
                await NALab.homePage.assertPageURL(
                    `Assert User land on account page`,
                    CONSTANTS.URL.myAccount)
            }
        )

        await test.step('Open Change Password Page',
            async () => {
                await NALab.homePage.clickOnLink('Password')
            }
        )

        await test.step('Change the Old Password',
            async () => {
                await NALab.changePasswordPage.enterNewPassword(cred.testUserPass)
                await NALab.changePasswordPage.enterConfirmNewPassword(cred.testUserPass)
                await NALab.changePasswordPage.clickOnContinue()
            }
        )

        await test.step('Confirm user land on accounts page and Change password success Alert is displayed',
            async () => {
                const isOnHomePage = await NALab.homePage.isOnHomePage();
                await assert.isTruthy('Assert User land on login page aster password change', isOnHomePage)
                const isSuccessAlertDiplayed = await NALab.homePage.isChangePasswordAlertDisplayed()
                await assert.isTruthy('Assert password change success alert is displayed', isSuccessAlertDiplayed)
            }
        )

        await test.step('Perform log out from the app',
            async () => {
                await NALab.homePage.clickOnLogOut();
                await NALab.logOutPage.waitForLogOutPageToLoad();
                await NALab.logOutPage.clickOnContinue();
                //await NALab.homePage.waitForHomePageToLoad();
                await NALab.homePage.assertPageURL(
                    `Assert home page url`,
                    CONSTANTS.URL.homePage)
            }
        )

        await test.step('Login to the app using changed password',
            async () => {
                await NALab.header.openLoginLinkFromHeader('Login')
                await NALab.loginPage.enterUsername(cred.testUserEmail);
                await NALab.loginPage.enterPassword(cred.testUserPass);
                await NALab.loginPage.clickOnLoginBtn();
                await NALab.homePage.waitForHomePageToLoad();
                await NALab.homePage.assertPageURL(
                    `Assert User land on account page`,
                    CONSTANTS.URL.myAccount)
            }
        )

        await test.step('Perform log out from the app',
            async () => {
                await NALab.homePage.clickOnLogOut();
                await NALab.logOutPage.waitForLogOutPageToLoad();
                await NALab.logOutPage.clickOnContinue();
                //await NALab.homePage.waitForHomePageToLoad();
                await NALab.homePage.assertPageURL(
                    `Assert home page url`,
                    CONSTANTS.URL.homePage)
            }
        )
    }
)