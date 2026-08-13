import { expect, Locator, mergeTests } from "@playwright/test";
import { test as envTest } from "../fixtures/envFixture"
import { test as PageTest } from "../fixtures/pageFixtures"
import { test as testData_test } from "./testDataFixture"

export const test = mergeTests(
    envTest,
    PageTest,
    testData_test
);
export { expect };
export type { Locator };
