const LocalStrategy = require('passport-local').Strategy;
const User = require('../mongo/model/user');
const bcrypt = require('bcrypt');

module.exports = {
  localStrategyMiddleware: passport => {
    const localOptions = {
      usernameField: 'email',
      passwordField: 'password'
    };

    passport.use(
      new LocalStrategy(localOptions, (username, password, done) => {
        console.log('deep inside');
        User.findOne({ email: username }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          bcrypt.compare(password, user.password, (err, match) => {
            if (match) {
              return done(null, user);
            }
            return done(null, err);
          });
        });
      })
    );
  }
};
