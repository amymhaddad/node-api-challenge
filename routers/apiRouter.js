const express = require('express');
router = express.Router();

//added handleError from MW
const { logger } = require('../middlewares/Middleware');
router.use(logger);

const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');

router.use('/projects', projectRouter);
router.use('/actions', actionRouter);


module.exports = router 

