import test, { expect, Locator, Page } from "@playwright/test"
import { BasePage } from "../BasePage"

export class HomePage extends BasePage {

    private readonly logoutLink: Locator;
    private readonly homePageHeaders: Locator;
    private readonly myAcnt_Hdr: Locator;
    private readonly myOrder_hdr: Locator;
    private readonly myAffiliateAcnt_hrd: Locator;
    private readonly newslattter_hrd: Locator
    //  private readonly loginBtn: Locator;             // Button to submit login form
    // private readonly forgottenPasswordLink: Locator;// Link to reset forgotten password

    constructor(page: Page) {
        super(page)
        this.logoutLink = page.getByRole('link', { name: 'Logout' })
        this.homePageHeaders = page.getByRole('heading', { level: 2 })
        this.myAcnt_Hdr = page.getByRole('heading', { name: 'My Account' });
        this.myOrder_hdr = page.getByRole('heading', { name: 'My Orders' });
        this.myAffiliateAcnt_hrd = page.getByRole('heading', { name: 'My Affiliate Account' });
        this.newslattter_hrd = page.getByRole('heading', { name: 'Newsletter' })
        //  this.loginBtn = page.getByRole('button', { name: 'Login' });
        // this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
    }

    // ── skip registry ──────────────────────────────────────────
    readonly skipVerification = [
    ];

    async waitForDashboard(): Promise<boolean> {
        // DOM parsed
        await this.page.waitForLoadState("domcontentloaded");
        return await this.logoutLink.isVisible();
    }

    async getHomePageTitle(): Promise<string> {
        return await test.step(`Retrieving the Home Page title`, async () => {
            return await this.page.title();
        });
    }

    async isLogOutLinkPresent(): Promise<boolean> {
        return await test.step(`Check if Logout link is visible`, async () => {
            return await this.logoutLink.isVisible();
        });
    }

    async doLogOut(): Promise<void> {
        await test.step(`Click on Logout link`, async () => {
            await this.logoutLink.click();
        });
    }

    async loginSuccess(): Promise<void> {
        await test.step(`Verifying successful login to application`, async () => {
            const isVisible = await this.logoutLink.isVisible();
            expect(isVisible, 'Login should succeed and account header should be visible').toBeTruthy();
        });
    }

    async getHomePageHeaders(): Promise<string[]> {
        return await this.homePageHeaders.allInnerTexts()
    }

}


