const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.get('/', usersController.usersListGet);
usersRouter
  .route('/create')
  .get(usersController.usersCreateGet)
  .post(usersController.usersCreatePost);
usersRouter
  .route('/:id/update')
  .get(usersController.usersUpdateGet)
  .post(usersController.usersUpdatePost);
usersRouter.post('/:id/delete', usersController.usersDeletePost);

module.exports = usersRouter;
