import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import * as MODEL from "../../models/pages/index"

export class Header extends BasePage {

    // =========================================================
    // FIELDS
    // =========================================================

    // =========================================================
    // LOCATORS
    // =========================================================
    private readonly myAccount: Locator;
    private readonly headerShorCutLinks: Locator;

    // =========================================================
    // CONSTRUCTOR
    // =========================================================
    constructor(page: Page) {
        super(page);
        this.myAccount = page.locator('li.dropdown a[title="My Account"]')
        this.headerShorCutLinks = page.locator('ul.dropdown-menu-right')
    }

    // =========================================================
    // NAVIGATION (entry point to this page)
    // =========================================================

    // =========================================================
    // ATOMIC ACTIONS (single user interaction each)
    // =========================================================
    async clickOnMyAccount(Option: MODEL.GuestUserMenu): Promise<void> {
        await this.action.click(`Click on ${Option}`,
            this.headerShorCutLinks.filter({ hasText: Option })
        )
    }

    async clickOnMyAccountLinkAsGuestUser(Option: MODEL.GuestUserMenu): Promise<void> {
        await this.action.click(`Click on ${Option}`,
            this.headerShorCutLinks.filter({ hasText: Option })
        )
    }

    // =========================================================
    // WORKFLOW ACTIONS (composite — multiple atomic actions combined)
    // =========================================================
    async openLoginLinkFromHeader(Option: MODEL.GuestUserMenu): Promise<void> {
        await this.action.click('Click on My Account', this.myAccount)
        await this.action.click(`Click on ${Option}`, this.headerShorCutLinks.filter({ hasText: Option }))
    }

    // =========================================================
    // STATE GETTERS (raw values — no assertions here)
    // =========================================================

    // =========================================================
    // LOCATOR GETTERS (expose Locator only when assert needs it directly)
    // =========================================================

}