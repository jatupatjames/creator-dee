import { Pool, QueryResult, QueryResultRow } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

// Single shared pool for the whole test run.
// Pool handles connection reuse so you don't open/close a new
// connection for every query.
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 5,                     // max connections in the pool
  idleTimeoutMillis: 30000,   // close idle clients after 30s
  connectionTimeoutMillis: 5000,
});

/**
 * Run a parameterized SQL query.
 * Always use $1, $2, ... placeholders — never string-concatenate values
 * into the query (that's how SQL injection happens).
 */
export async function runQuery<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = []
): Promise<QueryResult<T>> {
  const client = await pool.connect();
  try {
    return await client.query<T>(sql, params);
  } finally {
    client.release(); // always return the client to the pool
  }
}

/** Call this once after all tests finish (e.g. in globalTeardown). */
export async function closePool(): Promise<void> {
  await pool.end();
}
