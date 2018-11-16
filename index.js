'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');
const cheeseRouter = require('./routers/cheeseRouter');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: () => process.env.NODE_ENV === 'test',
  }),
);

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

app.use('/api/cheeses', cheeseRouter);

/* eslint-disable no-console */
function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', (err) => {
      console.error('Express failed to start');
      console.error(err);
    });
}
/* eslint-enable no-console */

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = { app };
