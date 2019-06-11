require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// logger with morgan
app.use(morgan('combined'));

// api routes
app.use('/api/students', require('./src/api/routes/'));

// start server 
const port = process.env.APP_PORT;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});