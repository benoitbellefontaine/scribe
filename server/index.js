var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('../webpack/dev')

const express = require('express');
//const logger = require('./logger');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose
  .connect(
    'mongodb://benoitbellefontaine:ny8gpa40@ds115866.mlab.com:15866/mern',
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    console.log('Connected to mongoDB');
  })
  .catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
  });

  new WebpackDevServer(webpack(config), {
    publicPath: 'http://10.17.1.26:3001', //config.output.publicPath,
    hot: true,
    inline: false,
    historyApiFallback: true,
    quiet: true,
    port: 3001,
    setup: function(app) {
  
      // Body Parser
      const urlencodedParser = bodyParser.urlencoded({ extended: true });
      app.use(urlencodedParser);
      app.use(bodyParser.json());
  
      // Hello
      /*app.post('/user/hello', (req, res) => {
          console.log('server.hello');
          res.json('Hello World');
      });*/
  
      // Router
      const router = express.Router();
      app.use('/user', router);
      require('./controllers/userController')(router);
  
    }
  }).listen(3001, '10.17.1.26', function (error, result) {
    if (error) {
      console.log(error)
    }
    console.log('Listening at http://10.17.1.26:3001!')
  })