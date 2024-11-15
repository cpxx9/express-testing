const logNames = (req, res) => {
  console.log('usernames will be logged here - wip');
  res.render('index', { title: 'List of Users:' });
};

module.exports = { logNames };
