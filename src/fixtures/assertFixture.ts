import { test as base } from '@playwright/test';
import { AssertUtil } from "../utils/assertions/assert.util"

type Fixtures = {
  assert: AssertUtil;
};

export const test = base.extend<Fixtures>({
  assert: async ({ }, use) => {
    await use(new AssertUtil());
  },
});

export { expect } from '@playwright/test';