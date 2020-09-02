const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');

//added handleError from MW
const { logger, handleErrors } = require('./middlewares/Middleware');

app.use(logger);
app.use('/api/projects', projectRouter);
app.use('/api/actions', actionRouter);

//Added use of handleError
app.use(handleErrors)

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(port, () => {
	console.log('Port:', port);
});


