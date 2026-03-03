import pool from "../config/db.js";

export const createUser = async (name, email, password, phoneNumber) => {
  const query = `
    INSERT INTO users (name, email, password, phone_number)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, phone_number
  `;

  const values = [name, email, password, phoneNumber];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};