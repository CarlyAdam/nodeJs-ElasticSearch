
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;
