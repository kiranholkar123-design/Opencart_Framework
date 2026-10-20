import { Page, Locator, test } from '@playwright/test';

export class RetrievalUtil {
    constructor(private page: Page) { }

    // =========================================================
    // TEXT RETRIEVAL
    // =========================================================

    async getInnerText(title: string, locator: Locator): Promise<string> {
        return await test.step(title, async () => {
            return await locator.innerText();
        });
    }

    async getAllInnerText(title: string, locator: Locator): Promise<string[]> {
        return await test.step(title, async () => {
            return await locator.allInnerTexts();
        });
    }

    async getTextContent(title: string, locator: Locator): Promise<string | null> {
        return await test.step(title, async () => {
            return await locator.textContent();
        });
    }

    async getAllTextContents(title: string, locator: Locator): Promise<string[]> {
        return await test.step(title, async () => {
            return await locator.allTextContents();
        });
    }

    // =========================================================
    // ATTRIBUTE / VALUE RETRIEVAL
    // =========================================================

    async getAttribute(title: string, locator: Locator, attributeName: string): Promise<string | null> {
        return await test.step(title, async () => {
            return await locator.getAttribute(attributeName);
        });
    }

    async getInputValue(title: string, locator: Locator): Promise<string> {
        return await test.step(title, async () => {
            return await locator.inputValue();
        });
    }

    // =========================================================
    // COUNT / STATE RETRIEVAL
    // =========================================================

    async getCount(title: string, locator: Locator): Promise<number> {
        return await test.step(title, async () => {
            return await locator.count();
        });
    }

    async isVisible(title: string, locator: Locator): Promise<boolean> {
        return await test.step(title, async () => {
            return await locator.isVisible();
        });
    }

    async isEnabled(title: string, locator: Locator): Promise<boolean> {
        return await test.step(title, async () => {
            return await locator.isEnabled();
        });
    }

    async isChecked(title: string, locator: Locator): Promise<boolean> {
        return await test.step(title, async () => {
            return await locator.isChecked();
        });
    }
}