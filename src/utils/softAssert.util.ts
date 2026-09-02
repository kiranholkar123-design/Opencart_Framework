

import { expect, Locator, Page, test } from "@playwright/test";

// =========================================================
// SOFT ASSERTIONS — same method names/signatures as Assert,
// just backed by expect.soft() instead of expect()
export class SoftAssertions {

  constructor() { }

  /** Step 1 (soft): Strict equality check */
  async toBe<T>(title: string, actual: T, expected: T, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(actual, message).toBe(expected);
    });
  }

  /** Step 2 (soft): Truthy check */
  async isTruthy(title: string, value: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(value, message).toBeTruthy();
    });
  }

  /** Step 3 (soft): Element visible */
  async toBeVisible(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeVisible();
    });
  }

  /** Step 4 (soft): Element hidden */
  async toBeHidden(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeHidden();
    });
  }

  /** Step 5 (soft): Contains text */
  async toContainText(title: string, locator: Locator, expected: string, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toContainText(expected);
    });
  }

  /** Step 6 (soft): Exact text */
  async toHaveText(title: string, locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveText(expected);
    });
  }

  /** Step 8 (soft): Element count */
  async toHaveCount(title: string, locator: Locator, count: number, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveCount(count);
    });
  }
}