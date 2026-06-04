import { Client } from 'pg';
import { DB_URL } from '../config'; // Replace or verify with your local config structure

const client = new Client({
    connectionString: DB_URL
});

// Always ensure the client is connected before running queries
client.connect().catch(err => console.error('Connection error', err.stack));

/**
 * Creates the users table if it does not exist
 */
export async function createUsersTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
        );
    `;
    await client.query(query);
}

/**
 * Inserts a new user into the database
 */
export async function insertUser(username: string, password: string, name: string) {
    const query = `
        INSERT INTO users (username, password, name) 
        VALUES ($1, $2, $3) 
        RETURNING id, username, name;
    `;
    const values = [username, password, name];
    const res = await client.query(query, values);
    return res.rows[0]; // Returns the created user object
}

/**
 * Fetches user information by their unique email/username
 */
export async function getUser(username: string) {
    const query = `
        SELECT * FROM users WHERE username = $1;
    `;
    const res = await client.query(query, [username]);
    return res.rows[0] || null;
}
