import { Page, Locator, test } from '@playwright/test';

export class ScreenshotUtil {
  constructor(private page: Page) {}

  // =========================================================
  // FULL PAGE
  // =========================================================

  async takeFullPageScreenshot(title: string, path: string): Promise<void> {
    await test.step(title, async () => {
      await this.page.screenshot({ path, fullPage: true });
    });
  }

  // =========================================================
  // ELEMENT-LEVEL
  // =========================================================

  async takeElementScreenshot(title: string, locator: Locator, path: string): Promise<void> {
    await test.step(title, async () => {
      await locator.screenshot({ path });
    });
  }
}