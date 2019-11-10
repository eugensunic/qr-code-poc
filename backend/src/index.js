const express = require('express');
const app = express();
const qrGenerator = require('./qr-generator');
const middleware = require('./middleware');
const mongo = require('./mongo/utils');
const register = require('./register');

const dbName = 'zagreb_museum';
const connectionString =
  'mongodb+srv://esunic123:mmug2012@cluster0-zknjl.mongodb.net/' +
  dbName +
  '?retryWrites=true';

mongo.mongoConnect(connectionString).then(_ => {
  console.log('Database connection successful');
  app.listen(5000, () => {
    console.log('app running on port 5000');
    middleware.init(app);
    register.init(app);
    qrGenerator.init(app);
  });
});
