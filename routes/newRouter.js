const { Router } = require('express');
const controller = require('../controllers/newController');

const newRouter = Router();

newRouter.route('/').get(controller.newUserGet).post(controller.newUserPost);

module.exports = newRouter;
