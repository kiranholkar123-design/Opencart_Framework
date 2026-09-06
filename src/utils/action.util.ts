import { Page, Locator, test } from '@playwright/test';

export class ActionUtil {
    constructor(private page: Page) { }

    // =========================================================
    // CLICK ACTIONS
    // =========================================================

    async click(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.click();
        });
    }

    async dblClick(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.dblclick();
        });
    }

    async rightClick(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.click({ button: 'right' });
        });
    }

    async forceClick(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.click({ force: true });
        });
    }

    async clickAt(title: string, locator: Locator, x: number, y: number): Promise<void> {
        await test.step(title, async () => {
            await locator.click({ position: { x, y } });
        });
    }

    // =========================================================
    // INPUT ACTIONS
    // =========================================================

    async fill(title: string, locator: Locator, value: string): Promise<void> {
        await test.step(title, async () => {
            await locator.fill(value);
        });
    }

    async clear(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.clear();
        });
    }

    async type(title: string, locator: Locator, text: string, delay = 50): Promise<void> {
        await test.step(title, async () => {
            await locator.pressSequentially(text, { delay });
        });
    }

    async press(title: string, locator: Locator, key: string): Promise<void> {
        await test.step(title, async () => {
            await locator.press(key);
        });
    }

    // =========================================================
    // SELECTION ACTIONS (checkbox, radio, dropdown)
    // =========================================================

    async check(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.check();
        });
    }

    async uncheck(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.uncheck();
        });
    }

    async selectByValue(title: string, locator: Locator, value: string): Promise<void> {
        await test.step(title, async () => {
            await locator.selectOption({ value });
        });
    }

    async selectByLabel(title: string, locator: Locator, label: string): Promise<void> {
        await test.step(title, async () => {
            await locator.selectOption({ label });
        });
    }

    async selectByIndex(title: string, locator: Locator, index: number): Promise<void> {
        await test.step(title, async () => {
            await locator.selectOption({ index });
        });
    }

    // =========================================================
    // MOUSE / DRAG ACTIONS
    // =========================================================

    async hover(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.hover();
        });
    }

    async dragAndDrop(title: string, source: Locator, target: Locator): Promise<void> {
        await test.step(title, async () => {
            await source.dragTo(target);
        });
    }

    async scrollIntoView(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.scrollIntoViewIfNeeded();
        });
    }

    async focus(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.focus();
        });
    }

    // =========================================================
    // FILE UPLOAD
    // =========================================================

    async uploadFile(title: string, locator: Locator, filePath: string | string[]): Promise<void> {
        await test.step(title, async () => {
            await locator.setInputFiles(filePath);
        });
    }

    async removeUploadedFile(title: string, locator: Locator): Promise<void> {
        await test.step(title, async () => {
            await locator.setInputFiles([]);
        });
    }
}