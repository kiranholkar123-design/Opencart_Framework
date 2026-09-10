import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import * as CONSTANTS from '../../constants'


export class LogOutPage extends BasePage {

    // =========================================================
    // FIELDS
    // =========================================================

    // =========================================================
    // LOCATORS
    // =========================================================
    private readonly continueBtn: Locator;
    // =========================================================
    // CONSTRUCTOR
    // =========================================================
    constructor(page: Page) {
        super(page);
        this.continueBtn = page.getByRole('link', { name: 'Continue' })
    }

    // =========================================================
    // NAVIGATION (entry point to this page)
    // =========================================================

    // =========================================================
    // ATOMIC ACTIONS (single user interaction each)
    // =========================================================
    async clickOnContinue(): Promise<void> {
        await this.action.click('Click on continue button', this.continueBtn)
    }

    // =========================================================
    // WORKFLOW ACTIONS (composite — multiple atomic actions combined)
    // =========================================================

    // =========================================================
    // Wait 
    // =========================================================
    async waitForLogOutPageToLoad(): Promise<void> {
        await this.navigation.waitForURL(
            'Wait for logout page to load',
            CONSTANTS.URL.logoutPage)
    }

    // =========================================================
    // STATE GETTERS (raw values — no assertions here)
    // =========================================================

    // =========================================================
    // LOCATOR GETTERS (expose Locator only when assert needs it directly)
    // =========================================================

}