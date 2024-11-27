const { getAllUsernames, findUser } = require('../db/queries');

const logNames = async (req, res) => {
  const { search } = req.query;
  if (!search) {
    const usernames = await getAllUsernames();
    res.render('index', { title: 'All users', usernames });
  } else {
    const usernames = await findUser(String(search));
    res.render('index', { title: 'All users', usernames });
  }
};

module.exports = { logNames };
