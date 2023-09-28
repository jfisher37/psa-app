const { Client } = require('pg');

// Retrieve the connection string from an environment variable
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
  dialect: 'postgres'
});

module.exports = client;