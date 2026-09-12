import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import * as CONSTANTS from '../../constants/index'


export class RegisterPage extends BasePage {

    // =========================================================
    // FIELDS
    // =========================================================

    // =========================================================
    // LOCATORS
    // =========================================================
    private readonly firstName_InpBox: Locator;
    private readonly lastName_InpBox: Locator;
    private readonly email_InpBox: Locator;
    private readonly telephone_InpBox: Locator;
    private readonly password_InpBox: Locator;
    private readonly confirmPassword_InpBox: Locator;
    private readonly newsLatterSub_checkBox: Locator;
    private readonly privatePolicy_checkBox: Locator;
    private readonly continueBtn: Locator;

    // =========================================================
    // CONSTRUCTOR
    // =========================================================
    constructor(page: Page) {
        super(page);
        this.firstName_InpBox = page.getByRole('textbox', { name: 'First Name' });
        this.lastName_InpBox = page.getByRole('textbox', { name: 'Last Name' });
        this.email_InpBox = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone_InpBox = page.getByRole('textbox', { name: 'Telephone' });
        this.password_InpBox = page.locator('#input-password')
        this.confirmPassword_InpBox = page.locator('#input-confirm')
        this.newsLatterSub_checkBox = page.locator('label.radio-inline')
        this.privatePolicy_checkBox = page.locator('input[name="agree"]')
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
    }

    // =========================================================
    // NAVIGATION (entry point to this page)
    // =========================================================

    // =========================================================
    // ATOMIC ACTIONS (single user interaction each)
    // =========================================================
    async enterFirtName(firstName: string): Promise<void> {
        await this.action.fill("Enter First Name", this.firstName_InpBox, firstName)
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.action.fill("Enter Lasst Name", this.lastName_InpBox, lastName)
    }

    async enterEmail(email: string): Promise<void> {
        await this.action.fill('Enter Email Address', this.email_InpBox, email)
    }

    async enterTelePhone(telePhone: string): Promise<void> {
        await this.action.fill('Enter Telephone number', this.telephone_InpBox, telePhone)
    }

    async enterPassWord(passWord: string): Promise<void> {
        await this.action.fill('Enter Password', this.password_InpBox, passWord)
    }

    async reEnterPassword(confirmPassword: string): Promise<void> {
        await this.action.fill('Re-enter Password', this.confirmPassword_InpBox, confirmPassword)
    }

    async selectNewsletterSubscribe(option: 'Yes' | 'No'): Promise<void> {
        await this.action.check("Select the Newsletter Option",
            this.newsLatterSub_checkBox.filter({ hasText: option }).locator('input'))
    }

    async selectPrivecyPolicy(option: 'Yes'): Promise<void> {
        if (option) {
            await this.action.click("Select the Privacy Policy", this.privatePolicy_checkBox)
        }
    }
    // =========================================================
    // WORKFLOW ACTIONS (composite — multiple atomic actions combined)
    // =========================================================

    // =========================================================
    // STATE GETTERS (raw values — no assertions here)
    // =========================================================
    async confirmIsOnRegisterPage(): Promise<boolean> {
        const pageUrl = await this.navigation.getCurrentURL('Get the register Page URL');
        return pageUrl.includes(CONSTANTS.URL.registerAccount)
    }

    // =========================================================
    // LOCATOR GETTERS (expose Locator only when assert needs it directly)
    // =========================================================


}