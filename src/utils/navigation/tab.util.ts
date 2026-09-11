import { Page, Locator, test } from '@playwright/test';

export class TabUtil {
  constructor(private page: Page) {}

  // =========================================================
  // OPEN NEW TAB(S)
  // =========================================================

  /** Step 1: Click something that opens a new tab, return the new page */
  async clickAndGetNewTab(title: string, locator: Locator): Promise<Page> {
    return await test.step(title, async () => {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        locator.click(),
      ]);
      await newPage.waitForLoadState('load');
      return newPage;
    });
  }

  /** Step 2: Click multiple trigger links, each opening its own new tab */
  async openMultipleTabs(title: string, triggerLinks: Locator[]): Promise<Page[]> {
    return await test.step(title, async () => {
      const childTabs: Page[] = [];
      for (const trigger of triggerLinks) {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          trigger.click(),
        ]);
        await newPage.waitForLoadState('load');
        childTabs.push(newPage);
      }
      return childTabs;
    });
  }

  /** Step 3: Wait for a popup window (e.g. OAuth login popup) */
  async waitForPopup(title: string, triggerAction: () => Promise<void>): Promise<Page> {
    return await test.step(title, async () => {
      const [popup] = await Promise.all([
        this.page.waitForEvent('popup'),
        triggerAction(),
      ]);
      await popup.waitForLoadState('load');
      return popup;
    });
  }

  // =========================================================
  // SWITCH BETWEEN TABS
  // =========================================================

  /** Step 4: Switch focus to a specific tab by index */
  async switchToTabByIndex(title: string, index: number): Promise<Page> {
    return await test.step(title, async () => {
      const pages = this.page.context().pages();
      const target = pages[index];
      await target!.bringToFront();
      return target!;
    });
  }

  /** Step 5: Switch focus to a specific tab object directly */
  async switchToTab(title: string, targetPage: Page): Promise<void> {
    await test.step(title, async () => {
      await targetPage.bringToFront();
    });
  }

  /** Step 6: Get count of currently open tabs */
  getTabCount(): number {
    return this.page.context().pages().length;
  }

  /** Step 7: Get all currently open tabs */
  getAllTabs(): Page[] {
    return this.page.context().pages();
  }

  // =========================================================
  // CLOSE TABS
  // =========================================================

  /** Step 8: Close a specific tab, optionally refocus another */
  async closeTab(title: string, targetPage: Page, refocusPage?: Page): Promise<void> {
    await test.step(title, async () => {
      await targetPage.close();
      if (refocusPage) {
        await refocusPage.bringToFront();
      }
    });
  }

  /** Step 9: Close the current tab */
  async closeCurrentTab(title: string): Promise<void> {
    await test.step(title, async () => {
      await this.page.close();
    });
  }

  /** Step 10: Close all tabs except the original/main one */
  async closeAllExceptMain(title: string, mainPage: Page): Promise<void> {
    await test.step(title, async () => {
      const pages = this.page.context().pages();
      for (const p of pages) {
        if (p !== mainPage) {
          await p.close();
        }
      }
    });
  }
}