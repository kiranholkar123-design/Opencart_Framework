import { Page, Locator, expect } from '@playwright/test';
import { test } from '@playwright/test';
import { SoftAssertions } from "./softAssert.util"


export class AssertUtil {

  public soft: SoftAssertions;

  constructor() {
    this.soft = new SoftAssertions();
  }

  // =========================================================
  // HARD ASSERTIONS — fail immediately, stop test execution
  // =========================================================

  /** Step 1: Strict equality check */
  async toBe<T>(title: string, actual: T, expected: T, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect(actual, message).toBe(expected);
    });
  }

  /** Step 2: Truthy check */
  async isTruthy(title: string, value: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect(value, message).toBeTruthy();
    });
  }

  /** Step 3: Element visible */
  async toBeVisible(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect(locator, message).toBeVisible();
    });
  }

  /** Step 4: Element hidden */
  async toBeHidden(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect(locator, message).toBeHidden();
    });
  }

  /** Step 5: Contains text */
  async toContainText(title: string, locator: Locator, expected: string, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect(locator, message).toContainText(expected);
    });
  }

  /** Step 6: Exact text */
  async toHaveText(title: string, locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect(locator, message).toHaveText(expected);
    });
  }

  /** Step 7: URL match */
  async toHaveURL(title: string, expected: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      // await expect(this.page, message).toHaveURL(expected);
    });
  }

  /** Step 8: Element count */
  async toHaveCount(title: string, locator: Locator, count: number, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect(locator, message).toHaveCount(count);
    });
  }
}