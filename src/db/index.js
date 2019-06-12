
const mongoose = require('mongoose');

const connect = async (dbUrl) => {
  if (!dbUrl) {
    throw new Error('Database url not defined');
  }
  await mongoose.connect(dbUrl, { useNewUrlParser: true });
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  connect,
  disconnect,
};
