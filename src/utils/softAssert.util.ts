// =========================================================
// SOFT ASSERTIONS — same method names/signatures as Assert,
// just backed by expect.soft() instead of expect()

import { expect, Locator, Page } from "@playwright/test";

// =========================================================
export class SoftAssertions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Step 1 (soft): Strict equality check */
  toBe<T>(actual: T, expected: T, message?: string): void {
    expect.soft(actual, message).toBe(expected);
  }

  /** Step 2 (soft): Truthy check */
  isTruthy(value: unknown, message?: string): void {
    expect.soft(value, message).toBeTruthy();
  }

  /** Step 3 (soft): Element visible */
  async toBeVisible(locator: Locator, message?: string): Promise<void> {
    await expect.soft(locator, message).toBeVisible();
  }

  /** Step 4 (soft): Element hidden */
  async toBeHidden(locator: Locator, message?: string): Promise<void> {
    await expect.soft(locator, message).toBeHidden();
  }

  /** Step 5 (soft): Contains text */
  async toContainText(locator: Locator, expected: string, message?: string): Promise<void> {
    await expect.soft(locator, message).toContainText(expected);
  }

  /** Step 6 (soft): Exact text */
  async toHaveText(locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await expect.soft(locator, message).toHaveText(expected);
  }

  /** Step 7 (soft): URL match */
  async toHaveURL(expected: string | RegExp, message?: string): Promise<void> {
    await expect.soft(this.page, message).toHaveURL(expected);
  }

  /** Step 8 (soft): Element count */
  async toHaveCount(locator: Locator, count: number, message?: string): Promise<void> {
    await expect.soft(locator, message).toHaveCount(count);
  }
}