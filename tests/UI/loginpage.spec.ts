

import { test, expect, Locator } from "../../src/fixtures/baseFixture";
import { MESSAGES } from "../../src/constants/messages"
import { Page } from "@playwright/test";

test('Verify user able to login', async ({ NALab, cred }) => {
    await test.step('launching the URL', async () => {
        await NALab.auth.loginPage.goToLoginPage(cred.baseUrl)
    })

    await test.step('performing user login with credentials', async () => {
        await NALab.auth.loginPage.enterUsername(cred.testUserEmail);
        await NALab.auth.loginPage.enterPassword(cred.testUserPass);
        await NALab.auth.loginPage.clickOnLoginBtn();
        await NALab.dashboard.homePage.loginSuccess();
    })

    await test.step('loging out from the app', async () => {
        await NALab.dashboard.homePage.doLogOut();
    })
});

test('Verify error message on incorrect email', async ({ NALab, assert, cred }) => {
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
        assert.isTruthy(isVisible)
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