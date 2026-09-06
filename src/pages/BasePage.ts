import test, { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { NavigationUtil } from "../utils/navigationUtil";
import { WaitUtil } from "../utils/wait.util";
import { ActionUtil } from "../utils/action.util";
import { AssertUtil } from "../utils/assert.util";
import { SoftAssertUtil } from "../utils/softAssert.util";
import { ScreenshotUtil } from "../utils/screenshot.util";
import { DialogUtil } from "../utils/dialog.util";
import { StorageUtil } from "../utils/storage.util";
import { FrameUtil } from "../utils/frame.util";

export class BasePage {
  protected readonly page: Page;
  protected readonly context: BrowserContext;

  // =========================================================
  // UTIL INSTANCES (shared across all pages extending BasePage)
  // =========================================================
  readonly navigation: NavigationUtil;
  readonly wait: WaitUtil;
  readonly action: ActionUtil;
  readonly softAssert: SoftAssertUtil;
  readonly screenshot: ScreenshotUtil;
  readonly dialog: DialogUtil;
  readonly storage: StorageUtil;
  readonly frame: FrameUtil;

  constructor(page: Page) {
    this.page = page;
    this.context = page.context();
    this.navigation = new NavigationUtil(page)


    this.navigation = new NavigationUtil(page);
    this.wait = new WaitUtil(page);
    this.action = new ActionUtil(page);
    this.softAssert = new SoftAssertUtil();
    this.screenshot = new ScreenshotUtil(page);
    this.dialog = new DialogUtil(page);
    this.storage = new StorageUtil(page, this.context);
    this.frame = new FrameUtil(page);

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
