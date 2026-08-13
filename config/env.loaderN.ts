import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const environment = process.env.ENV || 'dev';

const allowedEnvs = ['dev', 'qa', 'prod'];
if (!allowedEnvs.includes(environment)) {
  throw new Error(`Invalid ENV="${environment}". Allowed values: ${allowedEnvs.join(', ')}`);
}

const envFilePath = path.resolve(process.cwd(), `config/.env.${environment}`);

if (!fs.existsSync(envFilePath)) {
  throw new Error(`Env file not found: ${envFilePath}`);
}

// Parse the file directly — returns { KEY: 'value', ... } without polluting process.env
const parsed = dotenv.parse(fs.readFileSync(envFilePath));
console.log(`\n✅ Loaded env: ${envFilePath}\n`);

// Convert all keys to camelCase  e.g. BASE_URL → baseUrl
function toCamelCase(key: string): string {
  return key
    .toLowerCase()
    .replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

// Build a plain object: { baseUrl: '...', testUserEmail: '...', ... }
export const ENV: Record<string, string> & { environment: string } = { environment };

for (const [key, value] of Object.entries(parsed)) {
  ENV[toCamelCase(key)] = value;
}

export type AppEnv = typeof ENV;