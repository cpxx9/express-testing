const { getAllUsernames } = require('../db/queries');

const logNames = async (req, res) => {
  const usernames = await getAllUsernames();
  console.log('Usernames: ', usernames);
  res.send(`Usernames: ${usernames.map((user) => user.username).join(', ')}`);
};

module.exports = { logNames };
