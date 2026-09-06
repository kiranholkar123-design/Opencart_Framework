// Import Playwright types for Locator and Page
import test, { Locator, Page } from "@playwright/test"
import { BasePage } from "../BasePage";

// Page Object Model (POM) class representing the Login Page
export class LoginPage extends BasePage {

    // =========================================================
    // FIELDS
    // =========================================================

    // =========================================================
    // LOCATORS
    // =========================================================
    // 🔒 Private Locators: Elements on the Login Page
    private readonly emailid_InpBox: Locator;              // Input field for user email
    private readonly password_InpBox: Locator;             // Input field for user password
    private readonly loginBtn: Locator;             // Button to submit login form
    private readonly forgottenPasswordLink: Locator;
    private readonly forgPass_shortCutLink: Locator;// Link to reset forgotten password
    private readonly logo: Locator;                 // Application logo for branding/validation
    private readonly aboutUs: Locator;
    private readonly errorMsg: Locator;
    private readonly becomeAPartner: Locator;
    private readonly contactUs: Locator;
    private readonly pressReleases: Locator;
    private readonly forgotTxt: Locator;
    private readonly shortCutLinks: Locator;
    private readonly regAcntLink: Locator;

    // =========================================================
    // CONSTRUCTOR
    // =========================================================
    constructor(page: Page) {
        super(page);
        this.emailid_InpBox = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password_InpBox = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).nth(0)
        this.forgPass_shortCutLink = page.getByRole('link', { name: 'Forgotten Password' }).nth(1)
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

    // =========================================================
    // NAVIGATION (entry point to this page)
    // =========================================================
    async goToLoginPage(url: string): Promise<void> {
        await this.navigation.goto('Open the Login URL', url)
    }

    async navigateToForgotPasswordPage(): Promise<void> {
        await this.action.click(
            'Click on the forgot password link from shortcut links',
            this.forgPass_shortCutLink)
        await this.navigation.waitForLoadState(
            'Wait for forgot password page to load')
    }

    async clickOnForgotPasswordShortCutLinkAndNavigate(): Promise<void> {
        await test.step('Navigate to forgot password page by clicking on short cut link', async () => {
            await this.action.click('Click on forgot password link', this.forgPass_shortCutLink)
            await this.navigation.waitForLoadState(
                'Wait for forgot password page to load')
        })
    }

    // =========================================================
    // ATOMIC ACTIONS (single user interaction each)
    // =========================================================
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
        await this.action.click('Click on Login button', this.loginBtn)
        await this.navigation.waitForLoadState('Wait for Dashboard page to load')
    }

    async openRegisterAccountPage(): Promise<void> {
        await test.step('Open register account page from login page', async () => {
            await this.action.click('Click on register account link', this.regAcntLink)
            await this.navigation.waitForLoadState(
                'Wait for register account page to load')
        })
    }

    // =========================================================
    // WORKFLOW ACTIONS (composite — multiple atomic actions combined)
    // =========================================================
    async doLogin(email: string, password: string): Promise<void> {
        //console.log(`Attempting login with test credentials for QA validation:\nusername: ${username} \npassword: ${password}`);
        await this.action.fill('Enter email id', this.emailid_InpBox, email)
        await this.action.fill('Enter password', this.password_InpBox, password)
        await this.action.click('Click on login button', this.loginBtn)
        await this.navigation.waitForLoadState('Wait for home page to load')
    }
    // =========================================================
    // STATE GETTERS (raw values — no assertions here)
    // =========================================================
    async getAllLinks(): Promise<Locator[]> {
        return [
            this.aboutUs,
            // this.becomeAPartner,
            // this.contactUs,
            // this.pressReleases
        ]
    }

    async getLoginPageTitle(): Promise<string> {
        return test.step(`Retrieving the login page title`, async () => {
            return await this.page.title();
        });
    }

    async getShortCutLinksCount(): Promise<number> {
        return await test.step('Retriving the count of the all links', async () => {
            return await this.shortCutLinks.count()
        })
    }

    async getShortCutLinksTitles(): Promise<string[]> {
        return await test.step('Retriving the text of the all links', async () => {
            return await this.shortCutLinks.allTextContents()
        })
    }
    // =========================================================
    // LOCATOR GETTERS (expose Locator only when assert needs it directly)
    // =========================================================

    async checkErrorMessage(): Promise<boolean> {
        return await test.step(`Retrieving error message visibility`, async () => {
            return await this.errorMsg.isVisible();
        });
    }

    async isFprgotPwdLinkExist(): Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible()
    }

    async isRegisterAccountLinkDisplayed(): Promise<boolean> {
        return await test.step('Check visibility of Register Account link', async () => {
            return await this.regAcntLink.isVisible()
        })
    }
}
