import { test, expect, Locator } from "../../src/fixtures/baseFixture";
import { MESSAGES } from "../../src/constants/messages"
import * as CONSTANTS from "../../src/constants/index"

test('Verify user able to login',
    async ({ createNALab, cred }) => {
        const NALab = await createNALab()
        await test.step('Launching the URL', async () => {
            await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage)
        })

        await test.step('Perform login with valid credentials', async () => {
            await NALab.loginPage.doLogin(cred.testUserEmail, cred.testUserPass)
            await NALab.homePage.waitForHomePageToLoad();
            await NALab.homePage.assertPageURL(
                `Assert home page url`,
                CONSTANTS.URL.myAccount)
        })

        await test.step('Perform log out from the app', async () => {
            await NALab.homePage.clickOnLogOut();
            await NALab.logOutPage.waitForLogOutPageToLoad();
            await NALab.logOutPage.clickOnContinue();
            //await NALab.homePage.waitForHomePageToLoad();
            await NALab.homePage.assertPageURL(
                `Assert home page url`,
                CONSTANTS.URL.homePage)
        })
    });

test('Verify error message on incorrect email',
    async ({ createNALab, assert, cred }) => {
        const NALab = await createNALab()
        await test.step('launching the URL', async () => {
            await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage)
        })

        await test.step('entering invalid login credentials', async () => {
            await NALab.loginPage.enterUsername(cred.testUserEmail);
            await NALab.loginPage.enterPassword(cred.testUserEmail);
            await NALab.loginPage.clickOnLoginBtn();

        })

        await test.step('verifing the error message', async () => {
            const isVisible = await NALab.loginPage.checkErrorMessage();
            assert.isTruthy('Assert the error message is displayed or not', isVisible)
        })

    })

test('Verify error message on clicking of sign in button on empty email and password',
    async ({ createNALab, cred }) => {
        const NALab = await createNALab()
        await test.step('Launch login page', async () => {
            await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage)
        })

        await test.step('Click on sign in without credentials', async () => {
            await NALab.loginPage.clickOnLoginBtn();
        })

        await test.step('Verify error message visibility', async () => {
            const isVisible = await NALab.loginPage.checkErrorMessage();
            expect(isVisible).toBeTruthy()
        })
    })

test('Verify shortcut links on login page',
    async ({ createNALab, cred, assert }) => {
        const NALab = await createNALab()
        await test.step('Launch login page', async () => {
            await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage)
        })

        await test.step('Verify the count of the short cut links',
            async () => {
                const linkCount = await NALab.loginPage.getShortCutLinksCount();
                await assert.toBe("Assert link count is 13", linkCount, 13)
            }
        );

        await test.step('Verify the title of the short cut links',
            async () => {
                const allTitles = await NALab.loginPage.getShortCutLinksTitles();
                console.log(allTitles);
                await assert.toEqual("Assert link count is 13",
                    allTitles, CONSTANTS.TITLE.loginPage_shortCutLinkTitles)
            }
        )
    })

test('TC_Login_RegisterLink_RedirectionToSignUp',
    async ({ createNALab, cred, assert }) => {
        const NALab = await createNALab()
        await test.step('Launch login page', async () => {
            await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage)
        })

        await test.step('Verify the Register Account link visible on login page',
            async () => {
                const isVisible = await NALab.loginPage.isRegisterAccountLinkDisplayed();
                await assert.isTruthy("Assert register account link is displayed on login page", isVisible)
            }
        )

        await test.step('Click on the Register Account link and redirection to SignUp form',
            async () => {
                await NALab.loginPage.openRegisterAccountPage();
                await NALab.loginPage.assertPageURL(
                    "Assert sign up/register account link",
                    CONSTANTS.URL.registerAccount
                )
            }
        )
    })

test('Verify user redirect to forgot password page',
    async ({ createNALab, cred }) => {
        const NALab = await createNALab()
        await test.step('Launch the login page URL',
            async () => {
                await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage)
            }
        )

        await test.step('Click on the forgot password link from login in popup and navigate',
            async () => {
                await NALab.loginPage.navigateToForgotPasswordPage()
            }
        )

        await test.step('Confirm user is on Forgot password page',
            async () => {
                await NALab.loginPage.assertPageTitle(
                    'Assert user is on forgot password page',
                    'Forgot Your Password?')
            }
        )

        await test.step('Navigate back to login page',
            async () => {
                await NALab.loginPage.navigation.goBack(
                    'Click on the browser back button'
                )
            }
        )

        await test.step('Click on the forgot password link from login in popup and navigate',
            async () => {
                await NALab.loginPage.clickOnForgotPasswordShortCutLinkAndNavigate()
            }
        )

        await test.step('Confirm user is on Forgot password page',
            async () => {
                await NALab.loginPage.assertPageTitle(
                    'Assert user is on forgot password page',
                    'Forgot Your Password?')
            }
        )
    }
)