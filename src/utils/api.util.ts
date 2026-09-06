import { APIRequestContext, test } from '@playwright/test';

export class ApiUtil {
    constructor(private request: APIRequestContext) { }

    // =========================================================
    // CRUD METHODS
    // =========================================================

    async get(title: string, url: string, headers?: Record<string, string>) {
        return await test.step(title, async () => {
            return await this.request.get(url, {
                ...(headers !== undefined && { headers }),
            });
        });
    }

    async post(title: string, url: string, data: object, headers?: Record<string, string>) {
        return await test.step(title, async () => {
            return await this.request.post(url, {
                data,
                ...(headers !== undefined && { headers }),
            });
        });
    }

    async put(title: string, url: string, data: object, headers?: Record<string, string>) {
        return await test.step(title, async () => {
            return await this.request.put(url, {
                data,
                ...(headers !== undefined && { headers }),
            });
        });
    }

    async delete(title: string, url: string, headers?: Record<string, string>) {
        return await test.step(title, async () => {
            return await this.request.delete(url, {
                ...(headers !== undefined && { headers }),
            });
        });
    }

    // =========================================================
    // RESPONSE HELPERS
    // =========================================================

    async getResponseBody(title: string, response: Awaited<ReturnType<APIRequestContext['get']>>) {
        return await test.step(title, async () => {
            return await response.json();
        });
    }
}