import { pool } from "../../config/db";

const createTodo = async (userId: string, title: string) => {
  const result = await pool.query(
    `
        INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *
        `,
    [userId, title]
  );
  return result;
};

const getAllTodos = async () => {
  const result = await pool.query(`
        SELECT * FROM todos
        `);

  return result;
};

export const todoServices = {
  createTodo,
  getAllTodos,
};
