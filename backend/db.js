const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
  idle_timeout: 20,
  connect_timeout: 10
});

module.exports = sql;