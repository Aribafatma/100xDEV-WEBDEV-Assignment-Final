import { Client } from 'pg';
import { DB_URL } from '../config';

const client = new Client({
    connectionString: DB_URL
});

client.connect().catch(err => console.error('Connection error', err.stack));

/**
 * Creates the todos table with a foreign key reference to users
 */
export async function createTodoTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            done BOOLEAN DEFAULT FALSE
        );
    `;
    await client.query(query);
}

/**
 * Creates a new task linked to a specific user
 */
export async function createTodo(userId: number, title: string, description: string) {
    const query = `
        INSERT INTO todos (user_id, title, description) 
        VALUES ($1, $2, $3) 
        RETURNING id, user_id, title, description, done;
    `;
    const values = [userId, title, description];
    const res = await client.query(query, values);
    return res.rows[0];
}

/**
 * Retrieves all todo items belonging to a given user
 */
export async function getTodos(userId: number) {
    const query = `
        SELECT * FROM todos WHERE user_id = $1;
    `;
    const res = await client.query(query, [userId]);
    return res.rows;
}

/**
 * Updates a specific task's status to done/completed
 */
export async function updateTodo(todoId: number) {
    const query = `
        UPDATE todos 
        SET done = true 
        WHERE id = $1 
        RETURNING id, user_id, title, description, done;
    `;
    const res = await client.query(query, [todoId]);
    return res.rows[0];
}
