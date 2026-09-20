import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";



export class SearchPage extends BasePage {
    // =========================================================
    // FIELDS
    // =========================================================

    // =========================================================
    // LOCATORS
    // =========================================================
    private readonly productList: Locator

    // =========================================================
    // CONSTRUCTOR
    // =========================================================
    constructor(page: Page) {
        super(page);
        this.productList = page.locator('div.product-grid')
    }

    // =========================================================
    // NAVIGATION (entry point to this page)
    // =========================================================

    // =========================================================
    // ATOMIC ACTIONS (single user interaction each)
    // =========================================================

    // =========================================================
    // WORKFLOW ACTIONS (composite — multiple atomic actions combined)
    // =========================================================

    // =========================================================
    // STATE GETTERS (raw values — no assertions here)
    // =========================================================
    async isExpectedProductPresent(productName: string): Promise<boolean> {
        return await this.wait.isVisibleWithWait(`Check Expected Product Present On Results page: ${productName}`,
            this.productList.getByText(productName, { exact: true }),
            10_000
        )
    }

    // =========================================================
    // LOCATOR GETTERS (expose Locator only when assert needs it directly)
    // =========================================================

}
