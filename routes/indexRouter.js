const { Router } = require('express');

const links = [
  { href: '/', text: 'Home' },
  { href: 'about', text: 'About' },
];

const users = ['Rose', 'Cake', 'Biff'];

const indexRouter = Router();

indexRouter.get('/', (req, res) => res.render('index', { links, users }));
indexRouter.get('/about', (req, res) => res.send('About page'));
indexRouter
  .route('/contact')
  .get((req, res) => res.send('Contact page gotten'))
  .post((req, res) => res.send('Contact page posted'));

module.exports = indexRouter;
