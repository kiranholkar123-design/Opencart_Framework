import { test as baseTest } from '@playwright/test';
import { ENV, AppEnv } from '../../config/evn.loader'

type EnvFixture = {
  cred: AppEnv;
};

export const test = baseTest.extend<EnvFixture>({
  cred: async ({}, use) => {
    await use(ENV);   // fully loaded from correct .env.{environment} file
  },
});

