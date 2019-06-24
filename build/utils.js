const path = require('path');

module.exports = {
  resolve: (...arg) => path.join(__dirname, '..', ...arg),
};
