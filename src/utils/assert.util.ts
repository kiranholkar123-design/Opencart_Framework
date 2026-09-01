import { Page, Locator, expect } from '@playwright/test';
import { SoftAssertions } from "./softAssert.util"


export class AssertUtil {
  private page: Page;
  public soft: SoftAssertions;

  constructor(page: Page) {
    this.page = page;
    this.soft = new SoftAssertions(page);
  }

  // =========================================================
  // HARD ASSERTIONS — fail immediately, stop test execution
  // =========================================================

  /** Step 1: Strict equality check */
  toBe<T>(actual: T, expected: T, message?: string): void {
    expect(actual, message).toBe(expected);
  }

  /** Step 2: Truthy check */
  isTruthy(value: unknown, message?: string): void {
    expect(value, message).toBeTruthy();
  }

  /** Step 3: Element visible */
  async toBeVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  /** Step 4: Element hidden */
  async toBeHidden(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeHidden();
  }

  /** Step 5: Contains text */
  async toContainText(locator: Locator, expected: string, message?: string): Promise<void> {
    await expect(locator, message).toContainText(expected);
  }

  /** Step 6: Exact text */
  async toHaveText(locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await expect(locator, message).toHaveText(expected);
  }

  /** Step 7: URL match */
  async toHaveURL(expected: string | RegExp, message?: string): Promise<void> {
    await expect(this.page, message).toHaveURL(expected);
  }

  /** Step 8: Element count */
  async toHaveCount(locator: Locator, count: number, message?: string): Promise<void> {
    await expect(locator, message).toHaveCount(count);
  }
}

