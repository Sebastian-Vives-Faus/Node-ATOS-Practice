const pg = require("pg");
const { Pool } = pg;

// PostgreSQL Configuration
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: "localhost",
      user: "postgres",
      password: "62933926",
      database: "firstapi",
      port: "5432",
    };

const pool = new Pool(poolConfig);

module.exports = pool;
