const { Router } = require('express');
const logNames = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', logNames);

module.exports = indexsRouter;
