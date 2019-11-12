const express = require('express');
const passport = require('passport');
const app = express();
const qrGenerator = require('./qr-generator');
const middleware = require('./middleware');
const mongo = require('./mongo/utils');

const userAccess = require('./user-access');

const dbName = 'zagreb_museum';
const connectionString =
  'mongodb+srv://esunic123:mmug2012@cluster0-zknjl.mongodb.net/' +
  dbName +
  '?retryWrites=true';

mongo
  .mongoConnect(connectionString)
  .then(_ => {
    console.log('Database connection successful');
    app.listen(5000, () => {
      console.log('app running on port 5000');

      middleware.init(app, passport);
      userAccess.init(app, passport);

      qrGenerator.init(app);
    });
  })
  .catch(err => {
    // 504 Gateway Timeout need to adjust FE for this error
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// If the Node process ends, close the Mongoose connection
process
  .on('SIGINT', mongo.mongoDisconnect)
  .on('SIGTERM', mongo.mongoDisconnect);
