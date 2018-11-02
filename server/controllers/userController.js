const account = require('../lib.js');

module.exports = function(app) {
  console.log("userController");
  app.post('/login', account.login);
  app.post('/signup', account.signup);
};