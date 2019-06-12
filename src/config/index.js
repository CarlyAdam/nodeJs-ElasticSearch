const path = require('path');

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env'),
});

module.exports = {
  dbUrl: process.env.DB_URL,
  appEnv: process.env.NODE_ENV, // only production,development,test
  appName: process.env.APP_NAME,
  appPort: process.env.APP_PORT || 3000,
  esUrl: process.env.ES_URL,

};
