const express = require('express');
const app = express();
const router = require('./routers/apiRouter');
const { handleErrors } = require('./middlewares/Middleware');

const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use(handleErrors);

app.listen(port, () => {
	console.log('Port:', port);
});
