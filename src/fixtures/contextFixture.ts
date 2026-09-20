import { Browser, BrowserContext, Page } from "@playwright/test"
import { test as baseTest } from "@playwright/test"

type StorageState = string | { cookies: any[]; origins: any[] };

type contextFixture = {
    createContext: (storageState?: StorageState) => Promise<{ context: BrowserContext, page: Page }>
}

export const test = baseTest.extend<contextFixture>({
    createContext: async ({ browser }: { browser: Browser }, use) => {
        const created: BrowserContext[] = [];

        const factory = async (storageState?: StorageState) => {
            const context = await browser.newContext(
                storageState ? { storageState } : undefined
            );
            const page = await context.newPage();
            created.push(context);
            return { context, page };
        };

        await use(factory);

        for (const ctx of created) {
            await ctx.close();
        }
    }
})