const { getAllUsernames } = require('../db/queries');

const logNames = async (req, res) => {
  const usernames = await getAllUsernames();
  res.render('index', { title: 'All users', usernames });
};

module.exports = { logNames };
