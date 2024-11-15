const logNames = (req, res) => {
  res.render('index', { title: 'List of Users:' });
};

module.exports = { logNames };
