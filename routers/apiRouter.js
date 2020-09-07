const express = require('express');
router = express.Router();


const { logger } = require('../middlewares/Middleware');
router.use(logger);

//Note: the project and action routers are specifically named to prevent naming conflicts
const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');

router.use('/projects', projectRouter);
router.use('/actions', actionRouter);


module.exports = router 

