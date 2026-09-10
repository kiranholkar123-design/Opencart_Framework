import { Client, QueryResult } from 'pg';

export class DatabaseHelper {
    private client: Client;

    constructor() {
        this.client = new Client({
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'password',
            database: process.env.DB_NAME || 'testdb',
        });
    }

    async connect(): Promise<void> {
        await this.client.connect();
    }

    async getRecord<T = Record<string, any>>(query: string, params?: any[]): Promise<T> {
        const result: QueryResult = await this.client.query(query, params);
        return result.rows[0] as T; // single record
    }

    async getRecords<T = Record<string, any>>(query: string, params?: any[]): Promise<T[]> {
        const result: QueryResult = await this.client.query(query, params);
        return result.rows as T[]; // multiple records
    }

    async close(): Promise<void> {
        await this.client.end();
    }

    // One-shot helper: connect -> query -> close -> return
    async fetchData<T = Record<string, any>>(query: string, params?: any[]): Promise<T[]> {
        try {
            await this.connect();
            const result = await this.client.query(query, params);
            return result.rows as T[];
        } finally {
            await this.close();
        }
    }
}