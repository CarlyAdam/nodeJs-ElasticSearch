const printer = require('debug');

module.exports = (namespace, message) => {
  const d = printer(`app:${namespace}`);
  d(message);
  d.destroy();
};