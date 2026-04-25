import pool from "../config/db.js";

export const getAll = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [
    user_id,
  ]);
  return rows;
};

export const getById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
  return rows[0];
};

export const create = async (data) => {
  const { title, description, user_id } = data;
  const [result] = await pool.query(
    "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
    [title, description, user_id],
  );
  return result;
};

export const update = async (id, data) => {
  const { title, description, status } = data;
  await pool.query(
    "UPDATE tasks SET title=?, description=?, status=? WHERE id=?",
    [title, description, status, id],
  );
};

export const remove = async (id) => {
  await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
};
