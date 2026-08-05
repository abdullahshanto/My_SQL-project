require("dotenv").config();
const mysql = require("mysql2/promise");
const colors = require("colors");

const host = process.env.MYSQL_HOST || "localhost";
const user = process.env.MYSQL_USER || "root";
const password = process.env.MYSQL_PASSWORD || "kakarot";
const database = process.env.MYSQL_DATABASE || "All_data";
const port = Number(process.env.MYSQL_PORT || 3306);

async function initDb() {
  const adminConnection = await mysql.createConnection({
    host,
    user,
    password,
    port,
  });

  await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  await adminConnection.end();

  const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  await pool.query("SELECT 1");
  console.log(`Connected to MySQL database ${database}`.grey);
  return pool;
}

const dbPromise = initDb();

module.exports = { dbPromise, database };
