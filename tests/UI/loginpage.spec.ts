

import { test, expect, Locator } from "../../src/fixtures/baseFixture";
import { MESSAGES } from "../../src/constants/messages"
import { Page } from "@playwright/test";
import * as CONSTANT from "../../src/constants/index"

test('Verify user able to login',
    async ({ NALab, cred }) => {
        await test.step('Launching the URL', async () => {
            await NALab.auth.loginPage.goToLoginPage(cred.baseUrl)
        })

        await test.step('Performing user login with credentials', async () => {
            await NALab.auth.loginPage.enterUsername(cred.testUserEmail);
            await NALab.auth.loginPage.enterPassword(cred.testUserPass);
            await NALab.auth.loginPage.clickOnLoginBtn();
            await NALab.dashboard.homePage.loginSuccess();
        })

        await test.step('Loging out from the app', async () => {
            await NALab.dashboard.homePage.doLogOut();
        })
    });

test('Verify error message on incorrect email',
    async ({ NALab, assert, cred }) => {
        await test.step('launching the URL', async () => {
            await NALab.auth.loginPage.goToLoginPage(cred.baseUrl)
        })

        await test.step('entering invalid login credentials', async () => {
            await NALab.auth.loginPage.enterUsername(cred.testUserEmail);
            await NALab.auth.loginPage.enterPassword(cred.testUserEmail);
            await NALab.auth.loginPage.clickOnLoginBtn();

        })

        await test.step('verifing the error message', async () => {
            const isVisible = await NALab.auth.loginPage.checkErrorMessage();
            assert.isTruthy('Assert the error message is displayed or not', isVisible)
        })

    })

test('Verify error message on clicking of sign in button on empty email and password',
    async ({ NALab, cred }) => {
        await test.step('Launch login page', async () => {
            await NALab.auth.loginPage.goToLoginPage(cred.baseUrl)
        })

        await test.step('Click on sign in without credentials', async () => {
            await NALab.auth.loginPage.clickOnLoginBtn();
        })

        await test.step('Verify error message visibility', async () => {
            const isVisible = await NALab.auth.loginPage.checkErrorMessage();
            expect(isVisible).toBeTruthy()
        })
    })

test('Verify shortcut links on login page',
    async ({ NALab, cred, assert }) => {

        await test.step('Launch login page', async () => {
            await NALab.auth.loginPage.goToLoginPage(cred.baseUrl)
        })

        await test.step('Verify the count of the short cut links',
            async () => {
                const linkCount = await NALab.auth.loginPage.getShortCutLinksCount();
                await assert.toBe("Assert link count is 13", linkCount, 13)
            }
        );

        await test.step('Verify the title of the short cut links',
            async () => {
                const allTitles = await NALab.auth.loginPage.getShortCutLinksTitles();
                await assert.toBe("Assert link count is 13",
                    allTitles, CONSTANT.TITLE.loginPage_shortCutLinkTitles)
            }
        )
    })

test('TC_Login_RegisterLink_RedirectionToSignUp',
    async ({ NALab, cred, assert }) => {

        await test.step('Launch login page', async () => {
            await NALab.auth.loginPage.goToLoginPage(cred.baseUrl)
        })

        await test.step('Verify the Register Account link visible on login page',
            async () => {
                const isVisible = await NALab.auth.loginPage.isRegisterAccountLinkDisplayed();
                await assert.isTruthy("Assert register account link is displayed on login page", isVisible)
            }
        )

        await test.step('Click on the Register Account link and redirection to SignUp form',
            async () => {
                await NALab.auth.loginPage.openRegisterAccountPage();
                await NALab.auth.loginPage.assertPageURL(
                    "Assert sign up/register account link",
                    CONSTANT.URL.registerAccount
                )
            }
        )
    })

test('Verify user redirect to forgot password page',
    async ({ NALab, cred }) => {

        await test.step('Launch the login page URL',
            async () => {
                await NALab.auth.loginPage.goToLoginPage(cred.baseUrl)
            }
        )

        await test.step('Click on the forgot password link from login in popup and navigate',
            async () => {
                await NALab.auth.loginPage.navigateToForgotPasswordPage()
            }
        )

        await test.step('Confirm user is on Forgot password page',
            async () => {
                await NALab.auth.loginPage.assertPageTitle(
                    'Assert user is on forgot password page',
                    'Forgot Your Password?')
            }
        )

        await test.step('Navigate back to login page',
            async () => {
                await NALab.auth.loginPage.navigation.goBack(
                    'Click on the browser back button'
                )
            }
        )

        await test.step('Click on the forgot password link from login in popup and navigate',
            async () => {
                await NALab.auth.loginPage.clickOnForgotPasswordShortCutLinkAndNavigate()
            }
        )

        await test.step('Confirm user is on Forgot password page',
            async () => {
                await NALab.auth.loginPage.assertPageTitle(
                    'Assert user is on forgot password page',
                    'Forgot Your Password?')
            }
        )
    }
)