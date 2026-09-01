// utils/TokenManager.ts
import { request as playwrightRequest } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const TOKEN_FILE = 'auth/token.json';
const LOCK_FILE = 'auth/token.lock';

interface TokenData {
  token: string;
  expiresAt: number;
}

export class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<string> | null = null;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) TokenManager.instance = new TokenManager();
    return TokenManager.instance;
  }

  async getToken(): Promise<string> {
    const data = this.readFromDisk();

    if (data && Date.now() < data.expiresAt - 60_000) {
      return data.token;
    }

    // de-dupe concurrent calls within this worker process
    if (!this.refreshPromise) {
      this.refreshPromise = this.acquireLockAndFetch();
    }
    const token = await this.refreshPromise;
    this.refreshPromise = null;
    return token;
  }

  private readFromDisk(): TokenData | null {
    try {
      const raw = fs.readFileSync(TOKEN_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  private async acquireLockAndFetch(): Promise<string> {
    fs.mkdirSync(path.dirname(TOKEN_FILE), { recursive: true });

    // re-check after acquiring the intent to fetch — another worker may have just finished
    const existing = this.readFromDisk();
    if (existing && Date.now() < existing.expiresAt - 60_000) {
      return existing.token;
    }

    let gotLock = false;
    try {
      // 'wx' = create only if it doesn't exist; fails atomically if another worker already holds it
      fs.writeFileSync(LOCK_FILE, String(process.pid), { flag: 'wx' });
      gotLock = true;
    } catch {
      gotLock = false;
    }

    if (gotLock) {
      try {
        return await this.fetchNewToken();
      } finally {
        try {
          fs.unlinkSync(LOCK_FILE);
        } catch {
          // ignore if already removed
        }
      }
    }

    // another worker is fetching — wait for it to finish and re-read the file
    return this.waitForToken();
  }

  private async waitForToken(timeoutMs = 20_000): Promise<string> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const data = this.readFromDisk();
      if (data && Date.now() < data.expiresAt - 60_000) {
        return data.token;
      }

      // lock was released but token still missing/stale — try to grab it ourselves
      if (!fs.existsSync(LOCK_FILE)) {
        return this.acquireLockAndFetch();
      }
    }

    throw new Error('Timed out waiting for another worker to fetch the auth token.');
  }

  private async fetchNewToken(): Promise<string> {
    const context = await playwrightRequest.newContext();
    const res = await context.post(`${process.env.AUTH_URL}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        grant_type: 'client_credentials',
      },
    });

    if (!res.ok()) {
      throw new Error(`Failed to fetch token: ${res.status()} ${await res.text()}`);
    }

    const body = await res.json();
    await context.dispose();

    const tokenData: TokenData = {
      token: body.access_token,
      expiresAt: Date.now() + body.expires_in * 1000,
    };

    fs.mkdirSync(path.dirname(TOKEN_FILE), { recursive: true });
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
    return tokenData.token;
  }
}