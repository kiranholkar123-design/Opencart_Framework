import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../01_BasePage";

export class ForgotPasswordPage extends BasePage {


    private readonly forgotPassword_title: Locator;
    private readonly emailAddress_fld: Locator;
    private readonly back_btn: Locator;
    private readonly continue_btn: Locator;
    private readonly instruction_msg: Locator;
    private readonly warningOnIncorrectEmail_msg: Locator;
    private readonly successOnLinkFPwdSent_msg: Locator;

    constructor(page: Page) {
        super(page);
        this.forgotPassword_title = page.getByRole('heading', { name: "Forgot Your Password?" });
        this.emailAddress_fld = page.getByRole('textbox', { name: "* E-Mail Address" });
        this.back_btn = page.getByRole('link', { name: "Back" });
        this.continue_btn = page.getByRole('button', { name: "Continue" });
        this.instruction_msg = page.locator("#content > p");
        this.successOnLinkFPwdSent_msg = page.locator(`#account-login > div.alert`);
        this.warningOnIncorrectEmail_msg = page.locator(`#account-forgotten > div.alert`);
    }

    // ── skip registry ──────────────────────────────────────────
    readonly skipVerification = [
        "warningOnIncorrectEmail_msg",
        "successOnLinkFPwdSent_msg",
    ];

    // ─── Locator getters (for use in test-side expect()) ──────────────────────

    get warningMessage(): Locator {
        return this.warningOnIncorrectEmail_msg;
    }

    get successMessage(): Locator {
        return this.successOnLinkFPwdSent_msg;
    }

    get instructionMessage(): Locator {
        return this.instruction_msg;
    }

    // ─── Page state ───────────────────────────────────────────────────────────

    /**
     * Waits for the page to be ready.
     * Throws (via expect) if the heading is not visible within the default timeout.
     */
    async waitForForgotPasswordPage(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.forgotPassword_title).toBeVisible();
    }

    // ─── Actions ──────────────────────────────────────────────────────────────

    async submitForgotPasswordForm(emailID: string): Promise<void> {
        await this.fill(this.emailAddress_fld, emailID);
        await this.click(this.continue_btn);
    }

    async clickBack(): Promise<void> {
        await this.click(this.back_btn);
    }

}