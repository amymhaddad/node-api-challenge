const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = require('./routers/apiRouter');
app.use('/api', apiRouter);

const { logger, handleErrors } = require('./middlewares/Middleware');
app.use(logger);
app.use(handleErrors);

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(port, () => {
	console.log('Port:', port);
});
