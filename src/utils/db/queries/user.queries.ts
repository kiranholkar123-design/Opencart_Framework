export const UserQueries = {
  GET_USER_BY_ID: `SELECT * FROM users WHERE id = $1`,
  GET_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
  GET_ACTIVE_USERS: `SELECT * FROM users WHERE status = 'active'`,
  GET_USER_ORDERS_COUNT: `SELECT COUNT(*) FROM orders WHERE user_id = $1`,
  // ... rest of the 50, grouped by domain across multiple files
};