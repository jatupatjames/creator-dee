require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async () => {
  try {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log("Tables in", process.env.DB_NAME, ":");
    result.rows.forEach(r => console.log(" -", r.table_name));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
})();
