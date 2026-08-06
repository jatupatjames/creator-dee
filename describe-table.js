require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const tableName = process.argv[2] || "app_user";

(async () => {
  try {
    const result = await pool.query(
      `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position;
      `,
      [tableName]
    );
    console.log(`Columns in "${tableName}":`);
    result.rows.forEach(r =>
      console.log(` - ${r.column_name} (${r.data_type}, nullable: ${r.is_nullable})`)
    );
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
})();
