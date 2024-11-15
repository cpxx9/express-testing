const { insertUsername } = require('../db/queries');

const newUserGet = (req, res) => {
  res.render('new', { title: 'Create new user' });
};

const newUserPost = async (req, res) => {
  const { username } = req.body;
  await insertUsername(username);
  res.redirect('/');
};

module.exports = { newUserGet, newUserPost };
