module.exports = {
  development: {
    database: 'PSA',
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    ssl: { rejectUnauthorized: false },
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    ssl: { rejectUnauthorized: false },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: { rejectUnauthorized: false },
  },
}
