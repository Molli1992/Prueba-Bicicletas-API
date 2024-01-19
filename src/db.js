import { createPool } from "mysql2/promise";
import { HOST, USER, PASSWORD, DBPORT, DATABASE } from "./config.js";

const pool = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  port: DBPORT,
  database: DATABASE,
});

export default pool;
