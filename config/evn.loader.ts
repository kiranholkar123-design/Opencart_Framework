import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const environment = process.env.ENV || 'dev';

const allowedEnvs = ['dev', 'qa', 'stage'];
if (!allowedEnvs.includes(environment)) {
  throw new Error(
    `Invalid ENV="${environment}". Allowed values: ${allowedEnvs.join(', ')}`
  );
}

// ✅ replace path.resolve(__dirname, `../env/.env.${environment}`)
//    with direct inline path
const envFilePath = path.resolve(process.cwd(), `config/.env.${environment}`);

if (!fs.existsSync(envFilePath)) {
  throw new Error(`Env file not found: ${envFilePath}`);
}

dotenv.config({ path: envFilePath });
console.log(`\n✅ Loaded env: ${envFilePath}\n`);

// ── Helpers ───────────────────────────────────────────────
function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required key "${key}" in .env.${environment}`);
  return val;
}

function optional(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

// ✅ define optionalCreds before ENV block
const optionalCreds = (emailKey: string, passwordKey: string) => {
  const email    = process.env[emailKey];
  const password = process.env[passwordKey];
  return email && password ? { email, password } : null;
};

// ── Required ───────────────────────────────────────────────
// ── Always required — tests cannot run without these ──────
const REQUIRED_KEYS = {
  baseUrl:       required('BASE_URL'),
  testUserEmail: required('TEST_USER_EMAIL'),
  testUserPass:  required('TEST_USER_PASSWORD'),
};

// ── Optional — env specific, has safe fallback ────────────
const OPTIONAL_KEYS = {
   apiBaseUrl: optional('API_BASE_URL', `${REQUIRED_KEYS.baseUrl}/api`),
  apiKey:     optional('API_KEY', ''),
  timeout:    Number(optional('TEST_TIMEOUT', '30000')),
};

// ── Conditional — present in some envs only ───────────────
const CONDITIONAL_KEYS = {
  admin: optionalCreds('TEST_ADMIN_EMAIL', 'TEST_ADMIN_PASSWORD'),
};

export const ENV = {
  environment,
  ...REQUIRED_KEYS,
  ...OPTIONAL_KEYS,
  ...CONDITIONAL_KEYS,
} as const;

export type AppEnv = typeof ENV;