const pool = require('./pool');

async function getAllUsernames() {
  const { rows } = await pool.query('SELECT * FROM usernames');
  return rows;
}

async function insertUsername(username) {
  await pool.query('INSERT INTO usernames (username) VALUES ($1)', [username]);
}

async function findUser(search) {
  const { rows } = await pool.query(
    'SELECT * FROM usernames WHERE username ILIKE $1',
    [`%${search}%`],
  );

  return rows;
}

module.exports = {
  getAllUsernames,
  insertUsername,
  findUser,
};
