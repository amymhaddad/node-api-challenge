const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter')
const {handleErrors} = require('./middlewares/Middleware')

const port = 3000;


const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

app.use('/api', apiRouter)
app.use(handleErrors)


app.listen(port, () => {
	console.log('Port:', port);
});


 