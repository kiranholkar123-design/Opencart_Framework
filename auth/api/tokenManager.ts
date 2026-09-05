// utils/TokenManager.ts
import { request as playwrightRequest } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const TOKEN_FILE = path.join(__dirname, '..', 'auth', 'Api', 'tokens.json');
const LOCK_FILE = path.join(__dirname, '..', 'auth', 'Api', 'tokens.lock');

interface TokenEntry {
    token: string;
    expiresAt: number;
}

type TokenStore = Record<string, TokenEntry>;

export class TokenManager {
    private static instance: TokenManager;
    private refreshPromises: Map<string, Promise<string>> = new Map();

    private constructor() { }

    static getInstance(): TokenManager {
        if (!TokenManager.instance) TokenManager.instance = new TokenManager();
        return TokenManager.instance;
    }

    async getToken(email: string, password: string): Promise<string> {
        console.log(`[TokenManager] getToken() called for email="${email}"`);

        const store = this.readFromDisk();
        const entry = store[email];

        if (entry && Date.now() < entry.expiresAt - 60_000) {
            console.log(`[TokenManager] Using EXISTING token for email="${email}" (valid until ${new Date(entry.expiresAt).toLocaleTimeString()})`);
            return entry.token;
        }

        if (entry) {
            console.log(`[TokenManager] Token for email="${email}" is EXPIRED or expiring soon (was valid until ${new Date(entry.expiresAt).toLocaleTimeString()})`);
        } else {
            console.log(`[TokenManager] No existing token found on disk for email="${email}"`);
        }

        if (!this.refreshPromises.has(email)) {
            console.log(`[TokenManager] [PID ${process.pid}] Starting NEW acquireLockAndFetch for email="${email}"`);
            this.refreshPromises.set(email, this.acquireLockAndFetch(email, password));
        } else {
            console.log(`[TokenManager] [PID ${process.pid}] Reusing in-flight refresh promise (same process) for email="${email}"`);
        }

        const token = await this.refreshPromises.get(email)!;
        this.refreshPromises.delete(email);

        console.log(`[TokenManager] getToken() resolved for email="${email}"`);
        return token;
    }

    private readFromDisk(): TokenStore {
        try {
            const raw = fs.readFileSync(TOKEN_FILE, 'utf-8');
            const store = JSON.parse(raw);
            console.log(`[TokenManager] Read token store from disk (${Object.keys(store).length} email(s) found)`);
            return store;
        } catch {
            console.log(`[TokenManager] No token store file found on disk yet (or failed to parse)`);
            return {};
        }
    }

    private writeToDisk(store: TokenStore): void {
        fs.mkdirSync(path.dirname(TOKEN_FILE), { recursive: true });
        fs.writeFileSync(TOKEN_FILE, JSON.stringify(store, null, 2));
        console.log(`[TokenManager] Wrote token store to disk (${Object.keys(store).length} email(s) total)`);
    }

    private async acquireLockAndFetch(email: string, password: string): Promise<string> {
        console.log(`[TokenManager] [PID ${process.pid}] acquireLockAndFetch() called for email="${email}"`);
        fs.mkdirSync(path.dirname(TOKEN_FILE), { recursive: true });

        const existingStore = this.readFromDisk();
        const existingEntry = existingStore[email];
        if (existingEntry && Date.now() < existingEntry.expiresAt - 60_000) {
            console.log(`[TokenManager] [PID ${process.pid}] Found valid token just before locking for email="${email}", skipping fetch`);
            return existingEntry.token;
        }

        let gotLock = false;
        try {
            fs.writeFileSync(LOCK_FILE, String(process.pid), { flag: 'wx' });
            gotLock = true;
            console.log(`[TokenManager] [PID ${process.pid}] LOCK ACQUIRED for email="${email}"`);
        } catch {
            gotLock = false;
            console.log(`[TokenManager] [PID ${process.pid}] Lock ALREADY HELD by another process for email="${email}"`);
        }

        if (gotLock) {
            try {
                const token = await this.fetchNewToken(email, password);
                return token;
            } catch (err) {
                console.error(`[TokenManager] [PID ${process.pid}] LOGIN/FETCH FAILED for email="${email}":`, err);
                throw err;
            } finally {
                try {
                    fs.unlinkSync(LOCK_FILE);
                    console.log(`[TokenManager] [PID ${process.pid}] Lock RELEASED for email="${email}"`);
                } catch {
                    console.log(`[TokenManager] [PID ${process.pid}] Lock file already removed for email="${email}"`);
                }
            }
        }

        console.log(`[TokenManager] [PID ${process.pid}] Waiting for another process to finish fetching token for email="${email}"`);
        return this.waitForToken(email, password);
    }

    private async waitForToken(email: string, password: string, timeoutMs = 20_000): Promise<string> {
        const start = Date.now();
        console.log(`[TokenManager] [PID ${process.pid}] waitForToken() started for email="${email}" (timeout ${timeoutMs}ms)`);

        while (Date.now() - start < timeoutMs) {
            await new Promise((resolve) => setTimeout(resolve, 300));

            const store = this.readFromDisk();
            const entry = store[email];
            if (entry && Date.now() < entry.expiresAt - 60_000) {
                console.log(`[TokenManager] [PID ${process.pid}] Picked up token generated by another process for email="${email}"`);
                return entry.token;
            }

            if (!fs.existsSync(LOCK_FILE)) {
                console.log(`[TokenManager] [PID ${process.pid}] Lock disappeared but no valid token yet for email="${email}" — retrying fetch`);
                return this.acquireLockAndFetch(email, password);
            }
        }

        console.error(`[TokenManager] [PID ${process.pid}] TIMED OUT waiting for token for email="${email}" after ${timeoutMs}ms`);
        throw new Error(`Timed out waiting for token for email="${email}"`);
    }

    private async fetchNewToken(email: string, password: string): Promise<string> {
        console.log(`[TokenManager] [PID ${process.pid}] Calling auth API to generate NEW token for email="${email}"...`);

        const context = await playwrightRequest.newContext();
        const res = await context.post(`${process.env.AUTH_URL}`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            form: {
                username: email,
                password: password,
                grant_type: 'password',
            },
        });

        console.log(`[TokenManager] [PID ${process.pid}] Auth API responded with status ${res.status()} for email="${email}"`);

        if (!res.ok()) {
            const errorText = await res.text();
            console.error(`[TokenManager] [PID ${process.pid}] Auth API FAILED for email="${email}": ${res.status()} ${errorText}`);
            throw new Error(`Failed to fetch token for email="${email}": ${res.status()} ${errorText}`);
        }

        const body = await res.json();
        await context.dispose();

        if (!body.access_token) {
            console.error(`[TokenManager] [PID ${process.pid}] Auth response missing access_token for email="${email}"`);
            throw new Error(`Auth response did not contain access_token for email="${email}"`);
        }

        const entry: TokenEntry = {
            token: body.access_token,
            expiresAt: Date.now() + body.expires_in * 1000,
        };

        const store = this.readFromDisk();
        store[email] = entry;
        this.writeToDisk(store);

        console.log(`[TokenManager] [PID ${process.pid}] NEW token generated and saved for email="${email}" (valid until ${new Date(entry.expiresAt).toLocaleTimeString()})`);
        return entry.token;
    }
}