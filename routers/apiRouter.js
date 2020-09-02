const express = require('express');
router = express.Router();


const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');

//added handleError from MW
const { logger, handleErrors } = require('../middlewares/Middleware');

router.use(logger);
router.use('/projects', projectRouter);
router.use('/actions', actionRouter);

//Added use of handleError
router.use(handleErrors)


//Remember to export the router 
module.exports = router 