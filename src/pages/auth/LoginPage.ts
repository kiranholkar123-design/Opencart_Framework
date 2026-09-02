// Import Playwright types for Locator and Page
import test, { Locator, Page } from "@playwright/test"
import { BasePage } from "../01_BasePage";

// Page Object Model (POM) class representing the Login Page
export class LoginPage extends BasePage {

    // 🔒 Private Locators: Elements on the Login Page
    private readonly emailid_InpBox: Locator;              // Input field for user email
    private readonly password_InpBox: Locator;             // Input field for user password
    private readonly loginBtn: Locator;             // Button to submit login form
    private readonly forgottenPasswordLink: Locator;// Link to reset forgotten password
    private readonly logo: Locator;                 // Application logo for branding/validation
    private readonly aboutUs: Locator;
    private readonly errorMsg: Locator;
    private readonly becomeAPartner: Locator;
    private readonly contactUs: Locator;
    private readonly pressReleases: Locator;
    private readonly forgotTxt: Locator;
    private readonly shortCutLinks: Locator;
    private readonly regAcntLink: Locator;
    /**
     * 🏗️ Constructor: Initializes all locators when a Page instance is passed.
     * @param page - Playwright Page object used to interact with the browser
     */
    constructor(page: Page) {
        super(page);
        this.emailid_InpBox = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password_InpBox = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).nth(1)
        this.logo = page.getByAltText('naveenopencart');
        this.forgotTxt = page.locator("#id")

        this.errorMsg = page.locator('div.alert-dismissible')
        //-------------------------------------------------

        this.aboutUs = page.getByRole('link', { name: 'About Us' });
        this.becomeAPartner = page.getByRole('link', { name: 'Become a Partner' });
        this.contactUs = page.getByRole('link', { name: 'Contact Us' });
        this.pressReleases = page.getByRole('link', { name: 'Press Releases' })
        this.shortCutLinks = page.locator('.list-group a');
        this.regAcntLink = page.getByRole('link', { name: 'Continue' })
    }

    // ── skip registry ──────────────────────────────────────────
    readonly skipVerification = [
    ];

    async getAllLinks(): Promise<Locator[]> {
        return [
            this.aboutUs,
            // this.becomeAPartner,
            // this.contactUs,
            // this.pressReleases
        ]
    }
    // public page actions(Methods)/bahevior
    async goToLoginPage(url: string): Promise<void> {
        await test.step(`Open the login URL ${url}`, async () => {
            await this.page.goto(url);
        })
    }

    async enterUsername(userName: string): Promise<void> {
        await test.step(`Fill in username: ${userName}`, async () => {
            await this.emailid_InpBox.fill(userName);
        })
    }

    async enterPassword(password: string): Promise<void> {
        await test.step(`Fill in password: ${password}`, async () => {
            await this.password_InpBox.fill(password);
        })
    }

    async clickOnLoginBtn(): Promise<void> {
        await test.step(`Click on Login button`, async () => {
            await this.loginBtn.click();
        });
    }

    async checkErrorMessage(): Promise<boolean> {
        return await test.step(`Retrieving error message visibility`, async () => {
            return await this.errorMsg.isVisible();
        });
    }


    async getLoginPageTitle(): Promise<string> {
        return test.step(`Retrieving the login page title`, async () => {
            return await this.page.title();
        });
    }

    async isFprgotPwdLinkExist(): Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible()
    }

    async navigateToForgotPasswordPage(): Promise<void> {
        await this.click(this.forgottenPasswordLink);
    }

    async doLogin(username: string, password: string): Promise<void> {
        //console.log(`Attempting login with test credentials for QA validation:\nusername: ${username} \npassword: ${password}`);
        await this.emailid_InpBox.fill(username);
        await this.password_InpBox.fill(password);
        await this.loginBtn.click();
    }

    async getShortCutLinksCount(): Promise<number> {
        return await test.step('Retriving the count of the all links', async () => {
            return await this.shortCutLinks.count()
        })
    }

    async isRegisterAccountLinkDisplayed(): Promise<boolean> {
        return await test.step('Check visibility of Register Account link', async () => {
            return await this.regAcntLink.isVisible()
        })
    }

    async clickonRegisterAccountLink(): Promise<void> {
        await test.step('Click on register account link', async () => {
            await this.regAcntLink.click()
        })
    }

}
