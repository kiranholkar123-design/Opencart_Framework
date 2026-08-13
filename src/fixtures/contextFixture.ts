import { Browser, BrowserContext, Page } from "@playwright/test"
import { test as baseTest } from "@playwright/test"


type contextFixture = {
    createContext: () => Promise<{ context: BrowserContext, page: Page }>
}

export const test = baseTest.extend<contextFixture>({
    createContext: async ({ browser }: { browser: Browser }, use) => {
        const created: BrowserContext[] = [];

        const factory = async () => {
            const context = await browser.newContext();
            const page = await context.newPage();
            created.push(context);
            return { context, page };
        };

        await use(factory);

        for(const ctx of created){
            await ctx.close();
        }
    }
})