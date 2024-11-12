const { Router } = require('express');

const indexRouter = Router();

indexRouter.get('/', (req, res) =>
  res.render('index', { message: 'EJS rocks!' }),
);
indexRouter.get('/about', (req, res) => res.send('About page'));
indexRouter
  .route('/contact')
  .get((req, res) => res.send('Contact page gotten'))
  .post((req, res) => res.send('Contact page posted'));

module.exports = indexRouter;
