import EventRoute from './route/EventRoute';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(EventRoute);
const port = 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
