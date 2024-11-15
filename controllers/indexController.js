const db = require('../db/queries');

const logNames = async (req, res) => {
  const usernames = await db.getAllUsernames();
  console.log('Usernames: ', usernames);
  res.send('Usernames: ' + usernames.map((user) => user.username).join(', '));
};

module.exports = { logNames };
