import test, { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { NavigationUtil } from "../utils/navigationUtil";

export class BasePage {
  protected readonly page: Page;
  protected readonly context: BrowserContext;
  readonly navigation: NavigationUtil;

  constructor(page: Page) {
    this.page = page;
    this.context = page.context();
    this.navigation = new NavigationUtil(page)

  }

  // ─── Visibility Check ─────────────────────────────────────────────

  private async checkVisibility(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeVisible();
    } catch (error) {
      throw new Error(`❌ Element not visible — Incorrect locator or element not present in DOM — ${error}`);
    }
  }

  async waitForElementReady(
    locator: Locator,
    options?: {
      state?: 'visible' | 'attached' | 'detached' | 'hidden';
    }
  ): Promise<void> {
    const state = options?.state ?? 'visible';
    await locator.waitFor({ state });
    if (state === 'visible') {
      await locator.scrollIntoViewIfNeeded();
    }
  }


  // ─── Navigation ───────────────────────────────────────────────────

  async navigate(url: string, options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }): Promise<void> {
    try {
      await this.page.goto(url, {
        waitUntil: options?.waitUntil ?? 'networkidle'
      });
    } catch (error: any) {
      throw new Error(`Failed to navigate to ${url}: ${error.message}`);
    }
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded'); // fires first
    await this.page.waitForLoadState('networkidle');      // fires after
  }

  // ─── Actions ──────────────────────────────────────────────────────

  protected async click(step: string, locator: Locator): Promise<void> {
    await test.step(step, async () => {
      await this.checkVisibility(locator);   // ✅ captured separately
      try {
        await locator.click();
      } catch (error) {
        throw new Error(`❌ Could not click element — ${error}`);
      }
    })

  }

  async safeClick(locator: Locator,
    options?: {
      force?: boolean;
    }): Promise<void> {
    try {
      await this.waitForElementReady(locator);
      await locator.click({
        force: options?.force ?? false,
        trial: false
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to click: ${message}`);
    }
  }

  async fill(step: string, locator: Locator, value: string): Promise<void> {
    await test.step(step, async () => {
      await this.checkVisibility(locator);   // ✅ captured separately
      try {
        await locator.fill(value);
      } catch (error) {
        throw new Error(`❌ Could not fill element — ${error}`);
      }
    })
  }

  async safeFill(locator: Locator, text: string, options?: {
    clearBefore?: boolean,
  }) {
    await this.waitForElementReady(locator);
    if (options?.clearBefore !== false) {
      await locator.clear()
    }
    await locator.fill(text);
  }

  private async typeLikeHuman(locator: Locator, text: string, delay: number, options?: {
    clearBefore?: boolean,
  }) {
    await this.waitForElementReady(locator);
    await locator.click();
    if (options?.clearBefore !== false) {
      await locator.clear()
    }
    await locator.pressSequentially(text, { delay });
  }


  async getText(locator: Locator, options?: {
    trim?: boolean
  }): Promise<string> {
    await this.waitForElementReady(locator);   // same style as safeFill
    let text = await locator.innerText();
    if (options?.trim !== false) {
      text = text.trim();   // optional cleanup
    }
    return text;
  }

  // =========================================================
  // CHECKS / VERIFICATION METHODS (shared across all pages)
  // =========================================================

  /** Step 1: Check if element is visible */
  async isVisible(title: string, locator: Locator): Promise<boolean> {
    return await test.step(title, async () => {
      return await locator.isVisible();
    });
  }

  /** Step 2: Check if element is hidden */
  async isHidden(title: string, locator: Locator): Promise<boolean> {
    return await test.step(title, async () => {
      return await locator.isHidden();
    });
  }

  /** Step 3: Check if element is enabled */
  async isEnabled(title: string, locator: Locator): Promise<boolean> {
    return await test.step(title, async () => {
      return await locator.isEnabled();
    });
  }

  /** Step 4: Check if element is disabled */
  async isDisabled(title: string, locator: Locator): Promise<boolean> {
    return await test.step(title, async () => {
      return await locator.isDisabled();
    });
  }

  /** Step 5: Check if checkbox/radio is checked */
  async isChecked(title: string, locator: Locator): Promise<boolean> {
    return await test.step(title, async () => {
      return await locator.isChecked();
    });
  }

  /** Step 6: Check if element's text exactly matches expected value */
  async hasExactText(title: string, locator: Locator, expectedText: string): Promise<boolean> {
    return await test.step(title, async () => {
      const actualText = await locator.textContent();
      return actualText?.trim() === expectedText.trim();
    });
  }

  /** Step 7: Check if element's text contains expected substring */
  async hasPartialText(title: string, locator: Locator, expectedText: string): Promise<boolean> {
    return await test.step(title, async () => {
      const actualText = await locator.textContent();
      return actualText?.includes(expectedText) ?? false;
    });
  }

  /** Step 8: Check if element is present in DOM (even if not visible) */
  async isPresentInDOM(title: string, locator: Locator): Promise<boolean> {
    return await test.step(title, async () => {
      return (await locator.count()) > 0;
    });
  }

  /** Step 9: Get count of matching elements */
  async getElementCount(title: string, locator: Locator): Promise<number> {
    return await test.step(title, async () => {
      return await locator.count();
    });
  }

  /** Step 10: Get a specific attribute's value */
  async getAttributeValue(title: string, locator: Locator, attrName: string): Promise<string | null> {
    return await test.step(title, async () => {
      return await locator.getAttribute(attrName);
    });
  }
  
  // ─── Multiple Tab/Window Handling ──────────────────────────────────────────────────────

  async openMultipleTab(triggerLinks: Locator[]): Promise<Page[]> {

    const childWnds: Page[] = [];
    for (const trigger of triggerLinks) {
      const [newPage] = await Promise.all([
        this.context.waitForEvent('page'),
        trigger.click()
      ])
      await newPage.waitForLoadState();
      childWnds.push(newPage);
    }
    return childWnds;
  }

  async switchToTab(targetPage: Page) {
    await targetPage.bringToFront();
  }

  async closeTab(targetPage: Page, refocusPage?: Page) {
    await targetPage.close()
    if (refocusPage) { await this.page.bringToFront() }
  }

  // ─── Assertions ───────────────────────────────────────────────────

  async assertElementVisible(
    locator: Locator,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  async assertElementHidden(
    locator: Locator,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toBeHidden();
  }

  async assertElementText(
    locator: Locator,
    expectedText: string | RegExp,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toHaveText(expectedText);
  }

  async assertElementAttribute(
    locator: Locator,
    attribute: string,
    value: string,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toHaveAttribute(attribute, value);
  }

  async assertElementEnabled(
    locator: Locator,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toBeEnabled();
  }

  async assertPageURL(
    title: string,
    expectedURL: string | RegExp,
    message?: string
  ): Promise<void> {
    await test.step(title, async () => {
      await expect(this.page, message).toHaveURL(expectedURL);
    })
  }

  async assertPageTitle(
    title: string,
    expectedTitle: string | RegExp,
    message?: string
  ): Promise<void> {
    await test.step(title, async () => {
      await expect(this.page, message).toHaveTitle(expectedTitle);
    })
  }

  async assertInputValue(
    locator: Locator,
    expectedValue: string,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toHaveValue(expectedValue);
  }

  // ==================== SCREENSHOT METHODS ====================

  async takeScreenshot(name: string, fullPage: boolean = true): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `screenshots/${name}_${timestamp}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage });
    return screenshotPath;
  }

  async takeElementScreenshot(locator: Locator, name: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `screenshots/${name}_${timestamp}.png`;
    await locator.screenshot({ path: screenshotPath });
    return screenshotPath;
  }
}
