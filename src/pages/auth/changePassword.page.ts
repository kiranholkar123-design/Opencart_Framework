import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";



export class ChangePasswordPage extends BasePage {

    // =========================================================
    // FIELDS
    // =========================================================

    // =========================================================
    // LOCATORS
    // =========================================================
    private readonly password_InpBox: Locator;
    private readonly confirPassword_InpBox: Locator;
    private readonly continue_Btn: Locator;

    // =========================================================
    // CONSTRUCTOR
    // =========================================================
    constructor(page: Page) {
        super(page);
        this.password_InpBox = page.locator('#input-password');
        this.confirPassword_InpBox = page.locator('#input-confirm');
        this.continue_Btn = page.getByRole('button', { name: 'Continue' })

    }

    // =========================================================
    // NAVIGATION (entry point to this page)
    // =========================================================

    // =========================================================
    // ATOMIC ACTIONS (single user interaction each)
    // =========================================================
    async enterNewPassword(newPassword: string): Promise<void> {
        await this.action.fill('Enter New Password', this.password_InpBox, newPassword)
    }

    async enterConfirmNewPassword(confirmNewPassword: string): Promise<void> {
        await this.action.fill('Enter Confirm New Password', this.confirPassword_InpBox, confirmNewPassword)
    }

    async clickOnContinue(): Promise<void> {
        await this.action.click('Click on Continue button', this.continue_Btn)
    }

    // =========================================================
    // WORKFLOW ACTIONS (composite — multiple atomic actions combined)
    // =========================================================

    // =========================================================
    // STATE GETTERS (raw values — no assertions here)
    // =========================================================
    async isOnChangePasswordPage(endPoint: string): Promise<boolean> {
        const pageURL = await this.navigation.getCurrentURL('Get the Change Password page URL');
        return pageURL.includes(endPoint)
    }

    // =========================================================
    // LOCATOR GETTERS (expose Locator only when assert needs it directly)
    // =========================================================

}