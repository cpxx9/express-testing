require('dotenv/config');

const path = require('node:path');
const express = require('express');
const app = express();
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const indexRouter = require('./routes/indexRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// app.use('/authors', authorRouter);
// app.use('/books', bookRouter);
const users = ['Rose', 'Cake', 'Biff'];
const links = [
  { href: '/', text: 'Home' },
  { href: '/users', text: 'Users' },
  { href: '/about', text: 'About' },
];
app.get('/users', (req, res) => {
  res.render('user', { users, links });
});
app.use('/', indexRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
