import { Locator, APIResponse, test, expect } from '@playwright/test';

export class SoftAssertUtil {
  constructor() { }

  // =========================================================
  // RAW VALUE ASSERTIONS
  // =========================================================

  /** Step 1: Strict equality check */
  async toBe<T>(title: string, actual: T, expected: T, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(actual, message) as any).toBe(expected);
    });
  }

  /** Step 2: Deep equality check (objects/arrays) */
  async toEqual<T>(title: string, actual: T, expected: T, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(actual, message) as any).toEqual(expected);
    });
  }

  /** Step 3: Array contains expected items (order-independent) */
  async toEqualArrayContaining(title: string, actual: any[], expected: any[], message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(actual, message).toEqual(expect.arrayContaining(expected)); // ✅ works for arrays
    });
  }

  /** Step 4: Truthy check */
  async isTruthy(title: string, value: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(value, message) as any).toBeTruthy();
    });
  }

  /** Step 5: Falsy check */
  async isFalsy(title: string, value: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(value, message) as any).toBeFalsy();
    });
  }

  /** Step 6: Null check */
  async isNull(title: string, value: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(value, message) as any).toBeNull();
    });
  }

  /** Step 7: Undefined check */
  async isUndefined(title: string, value: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(value, message) as any).toBeUndefined();
    });
  }

  /** Step 8: Defined (not undefined) check */
  async isDefined(title: string, value: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(value, message) as any).toBeDefined();
    });
  }

  /** Step 9: NaN check */
  async isNaN(title: string, value: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(value, message) as any).toBeNaN();
    });
  }

  /** Step 10: Greater than */
  async toBeGreaterThan(title: string, actual: number, expected: number, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(actual, message).toBeGreaterThan(expected);
    });
  }

  /** Step 11: Greater than or equal */
  async toBeGreaterThanOrEqual(title: string, actual: number, expected: number, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(actual, message).toBeGreaterThanOrEqual(expected);
    });
  }

  /** Step 12: Less than */
  async toBeLessThan(title: string, actual: number, expected: number, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(actual, message).toBeLessThan(expected);
    });
  }

  /** Step 13: Less than or equal */
  async toBeLessThanOrEqual(title: string, actual: number, expected: number, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(actual, message).toBeLessThanOrEqual(expected);
    });
  }

  /** Step 14: Floating point closeness */
  async toBeCloseTo(title: string, actual: number, expected: number, precision = 2, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(actual, message).toBeCloseTo(expected, precision);
    });
  }

  /** Step 15: Array/string contains value */
  async toContain<T>(title: string, actual: T[] | string, expected: T | string, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(actual, message) as any).toContain(expected);
    });
  }

  /** Step 16: Array contains matching object (partial match) */
  async toContainEqual<T extends object>(title: string, actual: T[], expected: Partial<T>, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(actual, message).toContainEqual(expected);
    });
  }

  /** Step 17: Array/string length check */
  async toHaveLength(title: string, actual: unknown[] | string, expected: number, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(actual, message) as any).toHaveLength(expected);
    });
  }

  /** Step 18: Object has matching property/value */
  async toHaveProperty(title: string, actual: object, keyPath: string, value?: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      if (value !== undefined) {
        expect.soft(actual, message).toHaveProperty(keyPath, value);
      } else {
        expect.soft(actual, message).toHaveProperty(keyPath);
      }
    });
  }

  /** Step 19: String/regex match */
  async toMatch(title: string, actual: string, expected: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(actual, message).toMatch(expected);
    });
  }

  /** Step 20: Object partial match */
  async toMatchObject<T extends object>(title: string, actual: T, expected: Partial<T>, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(actual, message) as any).toMatchObject(expected);
    });
  }

  /** Step 21: Instance type check */
  async toBeInstanceOf(title: string, actual: unknown, expectedClass: Function, message?: string): Promise<void> {
    await test.step(title, async () => {
      (expect.soft(actual, message) as any).toBeInstanceOf(expectedClass);
    });
  }

  // =========================================================
  // LOCATOR-LEVEL ASSERTIONS
  // =========================================================

  /** Step 22: Element is visible */
  async toBeVisible(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeVisible();
    });
  }

  /** Step 23: Element is hidden */
  async toBeHidden(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeHidden();
    });
  }

  /** Step 24: Element is attached to DOM */
  async toBeAttached(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeAttached();
    });
  }

  /** Step 25: Element is enabled */
  async toBeEnabled(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeEnabled();
    });
  }

  /** Step 26: Element is disabled */
  async toBeDisabled(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeDisabled();
    });
  }

  /** Step 27: Element is editable */
  async toBeEditable(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeEditable();
    });
  }

  /** Step 28: Element is empty (no text/child elements) */
  async toBeEmpty(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeEmpty();
    });
  }

  /** Step 29: Element is focused */
  async toBeFocused(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeFocused();
    });
  }

  /** Step 30: Element is checked (checkbox/radio) */
  async toBeChecked(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeChecked();
    });
  }

  /** Step 31: Element is in viewport */
  async toBeInViewport(title: string, locator: Locator, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toBeInViewport();
    });
  }

  /** Step 32: Element contains given text */
  async toContainText(title: string, locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toContainText(expected);
    });
  }

  /** Step 33: Element has exact text */
  async toHaveText(title: string, locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveText(expected);
    });
  }

  /** Step 34: Element count matches */
  async toHaveCount(title: string, locator: Locator, count: number, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveCount(count);
    });
  }

  /** Step 35: Element has attribute with expected value */
  async toHaveAttribute(title: string, locator: Locator, attr: string, value: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveAttribute(attr, value);
    });
  }

  /** Step 36: Element has CSS class */
  async toHaveClass(title: string, locator: Locator, expected: string | RegExp | (string | RegExp)[], message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveClass(expected);
    });
  }

  /** Step 37: Element has CSS property with expected value */
  async toHaveCSS(title: string, locator: Locator, property: string, value: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveCSS(property, value);
    });
  }

  /** Step 38: Element has id */
  async toHaveId(title: string, locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveId(expected);
    });
  }

  /** Step 39: Element has JS property with expected value */
  async toHaveJSProperty(title: string, locator: Locator, name: string, value: unknown, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveJSProperty(name, value);
    });
  }

  /** Step 40: Input/textarea/select has expected value */
  async toHaveValue(title: string, locator: Locator, value: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveValue(value);
    });
  }

  /** Step 41: Multi-select has expected values */
  async toHaveValues(title: string, locator: Locator, values: (string | RegExp)[], message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveValues(values);
    });
  }

  /** Step 42: Element has accessible name */
  async toHaveAccessibleName(title: string, locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveAccessibleName(expected);
    });
  }

  /** Step 43: Element has accessible description */
  async toHaveAccessibleDescription(title: string, locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveAccessibleDescription(expected);
    });
  }

  /** Step 44: Element has ARIA role */
  async toHaveRole(title: string, locator: Locator, role: string, message?: string): Promise<void> {
    await test.step(title, async () => {
      await expect.soft(locator, message).toHaveRole(role as any);
    });
  }

  // =========================================================
  // API RESPONSE ASSERTIONS
  // =========================================================

  /** Step 45: API response status is in 200-299 range */
  async toBeOK(title: string, response: APIResponse, message?: string): Promise<void> {
    await test.step(title, async () => {
      expect.soft(response, message).toBeOK();
    });
  }
}