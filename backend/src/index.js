const express = require('express');
const passport = require('passport');
const app = express();
const userAccess = require('./user-access');
const qrGenerator = require('./qr-generator');
const clientVisitPage = require('./visit-page/index');
const middleware = require('./middleware');
const config = require('./config');

const mongo = require('./mongo/utils');

const dbName = 'zagreb_museum';
const connectionString =
  'mongodb+srv://esunic123:mmug2012@cluster0-zknjl.mongodb.net/' + dbName + '?retryWrites=true';
let listener = null;

mongo
  .mongoConnect(connectionString)
  .then(_ => {
    console.log('Database connection successful');
    listener = app.listen(5000, () => {
      // configure host
      config.HOST_PREFIX = !!process.env.HOST_PREFIX
        ? process.env.HOST_PREFIX
        : 'http://localhost:' + listener.address().port;

      console.log('app running on port:', listener.address().port);
      console.log('config host prefix is:', config.HOST_PREFIX);

      middleware.initPreMiddleware(app, passport);

      userAccess.init(app, passport);
      clientVisitPage.init(app);
      qrGenerator.init(app);

      middleware.initErrorRoutingMiddleware(app);
    });
  })
  .catch(err => {
    // 504 Gateway Timeout need to adjust FE for this error
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', mongo.mongoDisconnect).on('SIGTERM', mongo.mongoDisconnect);
