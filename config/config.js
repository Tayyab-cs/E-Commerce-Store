import dotenv from 'dotenv';

dotenv.config();

const { DB_USERNAME, DB_NAME, DB_HOST, DB_DIALECT } = process.env;

export default {
  development: {
    username: DB_USERNAME,
    password: null,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  test: {
    username: DB_USERNAME,
    password: null,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  production: {
    username: DB_USERNAME,
    password: null,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
};
