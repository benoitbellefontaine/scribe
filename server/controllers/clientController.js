const account = require('../lib.js');

module.exports = function(app) {
  console.log("clientController");
  app.get('/select', account.select);
  app.post('/insert', account.insert);
  app.post('/update', account.update);
};