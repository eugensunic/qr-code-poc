const LocalStrategy = require('passport-local').Strategy;
const User = require('../../mongo/model/user');
const bcrypt = require('bcrypt');

module.exports = {
  localStrategyMiddleware: passport => {
    const localOptions = {
      usernameField: 'email',
      passwordField: 'password'
    };

    passport.use(
      new LocalStrategy(localOptions, (username, password, done) => {
        User.findOne({ email: username }, function(err1, user) {
          if (err1) {
            return done(err1);
          }
          if (!user) {
            return done(null, false, {
              message: 'Incorrect username.',
              error: true
            });
          }
          // done won't go into middleware it will propagate to the called route
          // and contain the transferred arguments
          bcrypt.compare(password, user.password, (err2, match) => {
            if (err2) {
              return done(err2);
            }
            if (!match) {
              return done(null, false, {
                message: 'Incorrect password.',
                error: true
              });
            }
            return done(null, user);
          });
        });
      })
    );
  }
};
