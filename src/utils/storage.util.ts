import { Page, BrowserContext, test } from '@playwright/test';

export class StorageUtil {
  constructor(private page: Page, private context: BrowserContext) {}

  // =========================================================
  // COOKIES
  // =========================================================

  async getCookies(title: string) {
    return await test.step(title, async () => {
      return await this.context.cookies();
    });
  }

  async setCookie(title: string, cookie: Parameters<BrowserContext['addCookies']>[0][0]): Promise<void> {
    await test.step(title, async () => {
      await this.context.addCookies([cookie]);
    });
  }

  async clearCookies(title: string): Promise<void> {
    await test.step(title, async () => {
      await this.context.clearCookies();
    });
  }

  // =========================================================
  // LOCAL / SESSION STORAGE
  // =========================================================

  async getLocalStorageItem(title: string, key: string): Promise<string | null> {
    return await test.step(title, async () => {
      return await this.page.evaluate((k) => localStorage.getItem(k), key);
    });
  }

  async setLocalStorageItem(title: string, key: string, value: string): Promise<void> {
    await test.step(title, async () => {
      await this.page.evaluate(({ k, v }) => localStorage.setItem(k, v), { k: key, v: value });
    });
  }

  async clearLocalStorage(title: string): Promise<void> {
    await test.step(title, async () => {
      await this.page.evaluate(() => localStorage.clear());
    });
  }

  // =========================================================
  // STORAGE STATE (auth persistence)
  // =========================================================

  async saveStorageState(title: string, path: string): Promise<void> {
    await test.step(title, async () => {
      await this.context.storageState({ path });
    });
  }
}