import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
// Create the connection pool. The pool-specific settings are the defaults
const connPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,
  connectTimeout: 10000,
  queueLimit: 0,
});

connPool.getConnection().then(() => {
  console.log("CONNECTED");
});
export default connPool;
