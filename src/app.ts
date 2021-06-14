require('dotenv').config(); // This should always be the first line of index`
import ErrorHandlingMiddleware from './middlewares/ErrorHandlingMiddleware';
import EventRoute from './route/EventRoute';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(EventRoute);

app.use(ErrorHandlingMiddleware);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
