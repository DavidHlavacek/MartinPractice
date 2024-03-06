const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MartinPractice",
  password: "password",
  port: 5432,
});

module.exports = { pool };
a