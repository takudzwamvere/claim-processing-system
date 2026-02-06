const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createTables = async () => {
  try {
    // Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'patient',
        wallet_address VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Claims Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS claims (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        provider VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date VARCHAR(50),
        status VARCHAR(50) DEFAULT 'Pending',
        ipfs_hash VARCHAR(255),
        claim_hash VARCHAR(255) UNIQUE,
        tx_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database tables created successfully.");
    pool.end();
  } catch (err) {
    console.error("Error creating tables:", err);
    pool.end();
  }
};

createTables();
