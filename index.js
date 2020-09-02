const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter')

const port = 3000;


const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

app.use('/api', apiRouter)

app.listen(port, () => {
	console.log('Port:', port);
});

//Key points: 
//This file contains high level info about the project
//Direct to apiRouter, which will have all of my routes. This makes sense bc my url has this structure:
//api/routeName


// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const projectRouter = require('./projects/projectRouter');
// const actionRouter = require('./actions/actionRouter');

// //added handleError from MW
// const { logger, handleErrors } = require('./middlewares/Middleware');

// app.use(logger);
// app.use('/api/projects', projectRouter);
// app.use('/api/actions', actionRouter);

// //Added use of handleError
// app.use(handleErrors)

// app.get('/', (req, res) => {
// 	res.send('Hello');
// });

