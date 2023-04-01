const mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
console.log("connect success")
conn.connect();

module.exports = conn;
