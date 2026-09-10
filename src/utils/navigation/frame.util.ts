import { Page, Frame, Locator, test } from '@playwright/test';

export class FrameUtil {
  constructor(private page: Page) {}

  // =========================================================
  // FRAME ACCESS
  // =========================================================

  getFrameByName(name: string): Frame | null {
    return this.page.frame(name);
  }

  getFrameLocator(selector: string) {
    return this.page.frameLocator(selector);
  }

  // =========================================================
  // ACTIONS WITHIN A FRAME
  // =========================================================

  async clickInFrame(title: string, frameSelector: string, elementSelector: string): Promise<void> {
    await test.step(title, async () => {
      await this.page.frameLocator(frameSelector).locator(elementSelector).click();
    });
  }

  async fillInFrame(title: string, frameSelector: string, elementSelector: string, value: string): Promise<void> {
    await test.step(title, async () => {
      await this.page.frameLocator(frameSelector).locator(elementSelector).fill(value);
    });
  }
}