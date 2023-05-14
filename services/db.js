import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// export const db = mysql.createConnection(process.env.DATABASE_URL);
export const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect();
console.log("connect success");
