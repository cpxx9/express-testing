const newUserGet = (req, res) => {
  res.render('new', { title: 'Create new user' });
};

const newUserPost = (req, res) => {
  console.log(`Username to be saved: ${req.body.username}`);
};

module.exports = { newUserGet, newUserPost };
