require('dotenv').config();
const server = require('express');

const app = server();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./src/config');
const db = require('./src/db');
const debug = require('./src/helpers/debug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// logger with morgan
app.use(morgan('combined'));

// connect db
if (config.appEnv !== 'test') {
  db.connect(config.dbUrl)
    .then(() => debug('db', 'Db connected'))
    .catch(err => debug('db', err.message));
}

// api routes
app.use('/api/students', require('./src/api/routes/'));

// start server
app.listen(config.appPort, async () => {
  debug('entrypoint', `Server running on port: ${config.appPort}`);
});

module.exports = app;
