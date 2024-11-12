const { Router } = require('express');

const bookRouter = Router();

bookRouter.get('/', (req, res) => res.send('All books'));
bookRouter.get('/:bookId', (req, res) => {
  const { bookId } = req.params;
  res.send(`Book ID: ${bookId}`);
});
bookRouter
  .route('/:bookId/reserve')
  .get((req, res) => {
    const { bookId } = req.params;
    res.send(`Book ID: ${bookId} reserve status...`);
  })
  .post((req, res) => {
    const { bookId } = req.params;
    res.send(`Book ID: ${bookId} reserve status POSTED.`);
  });

module.exports = bookRouter;
