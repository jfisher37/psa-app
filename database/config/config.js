module.exports = {
  development: {
    database: 'PSA',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: { rejectUnauthorized: false },
  },
  test: {
    database: 'd15s5fre8di9dg',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: { 
      rejectUnauthorized: false },
  },
  production: {
    database: 'd15s5fre8di9dg',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: { rejectUnauthorized: false },
  },
}
