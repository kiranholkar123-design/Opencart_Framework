import { Page, Locator, test } from '@playwright/test';

export class NavigationUtil {
  constructor(private page: Page) {}

  // =========================================================
  // BASIC NAVIGATION
  // =========================================================

  /** Step 1: Navigate directly to a URL */
  async goto(step: string, url: string): Promise<void> {
    await test.step(step, async () => {
      await this.page.goto(url, { waitUntil: 'load' });
    });
  }

  /** Step 2: Go back in browser history */
  async goBack(step: string): Promise<void> {
    await test.step(step, async () => {
      await this.page.goBack({ waitUntil: 'load' });
    });
  }

  /** Step 3: Go forward in browser history */
  async goForward(step: string): Promise<void> {
    await test.step(step, async () => {
      await this.page.goForward({ waitUntil: 'load' });
    });
  }

  /** Step 4: Reload current page */
  async reload(step: string): Promise<void> {
    await test.step(step, async () => {
      await this.page.reload({ waitUntil: 'load' });
    });
  }

  // =========================================================
  // WAITING FOR LOAD STATES
  // =========================================================

  /** Step 5: Wait for a specific load state */
  async waitForLoadState(step: string, state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    await test.step(step, async () => {
      await this.page.waitForLoadState(state);
    });
  }

  /** Step 6: Click an element that triggers navigation, and wait for it */
  async clickAndWaitForNavigation(step: string, locator: Locator, state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    await test.step(step, async () => {
      await Promise.all([
        this.page.waitForLoadState(state),
        locator.click(),
      ]);
    });
  }

  /** Step 7: Click and wait for URL to match a pattern (SPA-friendly) */
  async clickAndWaitForURL(step: string, locator: Locator, urlPattern: string | RegExp): Promise<void> {
    await test.step(step, async () => {
      await Promise.all([
        this.page.waitForURL(urlPattern),
        locator.click(),
      ]);
    });
  }

  /** Step 8: Wait for URL to change/match, without a click (e.g. after a redirect) */
  async waitForURL(step: string, urlPattern: string | RegExp): Promise<void> {
    await test.step(step, async () => {
      await this.page.waitForURL(urlPattern);
    });
  }

  // =========================================================
  // NEW TAB / POPUP HANDLING
  // =========================================================

  /** Step 9: Click something that opens a new tab, return the new page */
  async clickAndGetNewTab(step: string, locator: Locator): Promise<Page> {
    return await test.step(step, async () => {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        locator.click(),
      ]);
      await newPage.waitForLoadState('load');
      return newPage;
    });
  }

  /** Step 10: Wait for a popup window (e.g. OAuth login popup) */
  async waitForPopup(step: string, triggerAction: () => Promise<void>): Promise<Page> {
    return await test.step(step, async () => {
      const [popup] = await Promise.all([
        this.page.waitForEvent('popup'),
        triggerAction(),
      ]);
      await popup.waitForLoadState('load');
      return popup;
    });
  }

  // =========================================================
  // NETWORK-AWARE WAITS
  // =========================================================

  /** Step 11: Wait for a specific API response after an action */
  async waitForResponse(step: string, urlPattern: string | RegExp, triggerAction: () => Promise<void>) {
    return await test.step(step, async () => {
      const [response] = await Promise.all([
        this.page.waitForResponse(urlPattern),
        triggerAction(),
      ]);
      return response;
    });
  }

  /** Step 12: Wait for a specific API request to fire */
  async waitForRequest(step: string, urlPattern: string | RegExp, triggerAction: () => Promise<void>) {
    return await test.step(step, async () => {
      const [request] = await Promise.all([
        this.page.waitForRequest(urlPattern),
        triggerAction(),
      ]);
      return request;
    });
  }

  // =========================================================
  // ELEMENT-BASED READINESS (most reliable for SPAs)
  // =========================================================

  /** Step 13: Wait for a specific element to appear (best signal page is "ready") */
  async waitForElement(step: string, locator: Locator, state: 'visible' | 'attached' | 'hidden' | 'detached' = 'visible'): Promise<void> {
    await test.step(step, async () => {
      await locator.waitFor({ state });
    });
  }

  // =========================================================
  // TAB / WINDOW MANAGEMENT
  // =========================================================

  /** Step 14: Close current page/tab */
  async closeCurrentTab(step: string): Promise<void> {
    await test.step(step, async () => {
      await this.page.close();
    });
  }

  /** Step 15: Switch focus to a specific tab (by index in context.pages()) */
  async switchToTab(step: string, index: number): Promise<Page> {
    return await test.step(step, async () => {
      const pages = this.page.context().pages();
      const target = pages[index];
      await target!.bringToFront();
      return target!;
    });
  }

  // =========================================================
  // FRAME NAVIGATION
  // =========================================================

  /** Step 16: Get a specific iframe on the page */
  getFrame(frameNameOrUrl: string) {
    return this.page.frame(frameNameOrUrl);
  }
}