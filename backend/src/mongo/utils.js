const mongoose = require('mongoose');

//'mongodb://127.0.0.1:27017/users'

const mongoFunctions = {
  mongoConnect: (urlString, dbName) => {
    mongoFunctions.configureMongoDeprecation();
    return mongoose.connect(urlString + dbName, {
      useNewUrlParser: true,
      poolSize: 15,
      useUnifiedTopology: true
    });
  },

  mongoDisconnect: () => {
    mongoose.disconnect();
    process.exit(0);
    console.log('Ive disconnected mongo');
  },

  configureMongoDeprecation: () => {
    mongoose.set('useFindAndModify', false);
  }
};

module.exports = mongoFunctions;
