import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ploy659239",
  database: "CUseeyou",
});
