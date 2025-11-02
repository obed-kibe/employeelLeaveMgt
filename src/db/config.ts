import dotenv from 'dotenv';
import assert from 'assert';
import sql from 'mssql';

dotenv.config();

const {
  SQL_SERVER,
  SQL_INSTANCE,
  SQL_USER,
  SQL_PWD,
  SQL_DB,
  SQL_PORT,
  PORT
} = process.env;

assert(PORT, 'PORT is required');
assert(SQL_SERVER, 'SQL_SERVER is required');
assert(SQL_USER, 'SQL_USER is required');
assert(SQL_PWD, 'SQL_PWD is required');
assert(SQL_DB, 'SQL_DB is required');

export const config = {
  port: PORT,
  sqlConfig: {
    user: SQL_USER,
    password: SQL_PWD,
    database: SQL_DB,
    server: `${SQL_SERVER}\\${SQL_INSTANCE}`,
    port: Number(SQL_PORT) || 8081,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // ❗ for local SQL Express, must be false
      trustServerCertificate: true // allows self-signed certs
    }
  }
};

export const getPool = async () => {
  try {
    const pool = await sql.connect(config.sqlConfig);
    console.log('✅ Connected to SQL Server');
    return pool;
  } catch (error) {
    console.error('❌ SQL Connection Error:', error);
    throw error;
  }
};
