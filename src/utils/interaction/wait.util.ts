import { Page, Locator, test } from '@playwright/test';

export class WaitUtil {
    constructor(private page: Page) { }

    // =========================================================
    // ELEMENT WAITS
    // =========================================================

    async waitForVisible(title: string, locator: Locator, timeout?: number): Promise<boolean> {
        return await test.step(title, async () => {
            return await locator.waitFor({
                state: 'visible',
                ...(timeout !== undefined && { timeout }),
            })
                .then(() => true)
                .catch(() => false);
        });
    }

    async waitForHidden(title: string, locator: Locator, timeout?: number): Promise<void> {
        await test.step(title, async () => {
            await locator.waitFor({
                state: 'hidden',
                ...(timeout !== undefined && { timeout }),
            });
        });
    }

    async waitForAttached(title: string, locator: Locator, timeout?: number): Promise<void> {
        await test.step(title, async () => {
            await locator.waitFor({
                state: 'attached',
                ...(timeout !== undefined && { timeout }),
            });
        });
    }

    async waitForDetached(title: string, locator: Locator, timeout?: number): Promise<void> {
        await test.step(title, async () => {
            await locator.waitFor({
                state: 'detached',
                ...(timeout !== undefined && { timeout }),
            });
        });
    }

    // =========================================================
    // PAGE / LOAD WAITS
    // =========================================================

    async waitForLoadState(title: string, state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        await test.step(title, async () => {
            await this.page.waitForLoadState(state);
        });
    }

    async waitForTimeout(title: string, ms: number): Promise<void> {
        await test.step(title, async () => {
            await this.page.waitForTimeout(ms);
        });
    }

    async waitForFunction(title: string, fn: () => boolean, timeout?: number): Promise<void> {
        await test.step(title, async () => {
            await this.page.waitForFunction(fn, undefined, {
                ...(timeout !== undefined && { timeout }),
            });
        });
    }

    // =========================================================
    // NETWORK WAITS
    // =========================================================

    async waitForResponse(title: string, urlPattern: string | RegExp, triggerAction: () => Promise<void>) {
        return await test.step(title, async () => {
            const [response] = await Promise.all([
                this.page.waitForResponse(urlPattern),
                triggerAction(),
            ]);
            return response;
        });
    }

    async waitForRequest(title: string, urlPattern: string | RegExp, triggerAction: () => Promise<void>) {
        return await test.step(title, async () => {
            const [request] = await Promise.all([
                this.page.waitForRequest(urlPattern),
                triggerAction(),
            ]);
            return request;
        });
    }
}