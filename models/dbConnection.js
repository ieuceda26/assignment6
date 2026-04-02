/*
Name: Isaac Euceda
Date: 4/02/2026
CSC-372-01
This file establishes a connection to the PostgreSQL database using the 'pg' library. It reads the database connection string from environment variables and configures SSL settings for secure connections. The connection pool is exported for use in other parts of the application to perform database operations.
*/
require('dotenv').config();
const { Pool } = require('pg');
const { ssl } = require('pg/lib/defaults');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;