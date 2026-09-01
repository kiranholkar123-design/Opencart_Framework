import { test as base } from '@playwright/test';
import { AssertUtil } from "../utils/assert.util"

type Fixtures = {
  assert: AssertUtil;
};

export const test = base.extend<Fixtures>({
  assert: async ({ page }, use) => {
    await use(new AssertUtil(page));
  },
});

export { expect } from '@playwright/test';