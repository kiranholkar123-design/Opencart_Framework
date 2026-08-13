import { Locator, Page } from "@playwright/test"
import { BasePage } from "../01_BasePage"

export class HomePage extends BasePage {

    private readonly logoutLink: Locator;
    private readonly homePageHeaders: Locator;
    //  private readonly loginBtn: Locator;             // Button to submit login form
    // private readonly forgottenPasswordLink: Locator;// Link to reset forgotten password

    constructor(page: Page) {
        super(page)
        this.logoutLink = page.getByRole('link', { name: 'Logout' })
        this.homePageHeaders = page.getByRole('heading', { level: 2 })
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
        return await this.page.title();
    }

    async isLogOutLinkPresent(): Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    async doLogOut(): Promise<void> {
        await this.logoutLink.click();
    }

    async getHomePageHeaders(): Promise<string[]> {
        return await this.homePageHeaders.allInnerTexts()
    }

}


