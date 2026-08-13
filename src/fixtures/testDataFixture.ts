import { test as basetest } from "@playwright/test";
import { TestDataGenerator } from "../data/TestDataGenerator";

type testDataFixture = {
    testData: TestDataGenerator;
};

export const test = basetest.extend<testDataFixture>({
    testData: async ({ }, use) => {
        const testData = new TestDataGenerator();
        await use(testData);
    },
});