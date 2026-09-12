import { test } from "../../src/fixtures/baseFixture";
import * as CONSTANTS from "../../src/constants/index"
import { RegisterPage } from "../../src/pages/auth/RegisterPage";
import { register } from "node:module";


test('Verify User able to complete the Account creation/register form',
    async ({ NALab, assert }) => {


        await test.step('Launching the URL',
            async () => {
                await NALab.loginPage.goToLoginPage(CONSTANTS.URL.loginPage)
            }
        )

        await test.step('Navigate to Register Page',
            async () => {
                await NALab.loginPage.openRegisterAccountPage()
                const isOnRegisterPage = await NALab.registerPage.confirmIsOnRegisterPage();
                await assert.isTruthy('Assert Is on Register Page', isOnRegisterPage)
            }
        )

        await test.step('Fill out the Register Account Form',
            async () => {
                await NALab.registerPage.enterFirtName('Kiran');
                await NALab.registerPage.enterLastName('Test');
                await NALab.registerPage.enterEmail('testuser234@test.com');
                await NALab.registerPage.enterTelePhone('3342342332')
                await NALab.registerPage.enterPassWord('test@123');
                await NALab.registerPage.reEnterPassword('test@123');
                await NALab.registerPage.selectNewsletterSubscribe('Yes');
                await NALab.registerPage.selectPrivecyPolicy('Yes')
               // await NALab.registerPage.pause()
            }
        )

    }
)