import { Pool, QueryResult } from 'pg';

export const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'testdb',
};


export class DatabaseHelper {
    private static pool: Pool;

    // Singleton pool — created once, reused everywhere
    private static getPool(): Pool {
        if (!DatabaseHelper.pool) {
            DatabaseHelper.pool = new Pool({
                ...dbConfig,
                max: 10,                     // max connections in pool
                idleTimeoutMillis: 30000,    // close idle clients after 30s
                connectionTimeoutMillis: 5000,
            });
        }
        return DatabaseHelper.pool;
    }

    async getRecords<T = Record<string, any>>(query: string, params?: any[]): Promise<T[]> {
        const pool = DatabaseHelper.getPool();
        const result: QueryResult = await pool.query(query, params);
        return result.rows as T[];
    }

    async getRecord<T = Record<string, any>>(query: string, params?: any[]): Promise<T | undefined> {
        const rows = await this.getRecords<T>(query, params);
        return rows[0];
    }

    // Call this ONLY once, when all tests are done
    static async closePool(): Promise<void> {
        if (DatabaseHelper.pool) {
            await DatabaseHelper.pool.end();
        }
    }
}