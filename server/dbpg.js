const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'sdc',
  port: 5432,
  password: 'apple123',
  database: 'sdc'
})

module.exports = client;