const jwt = require('jsonwebtoken');
const jwtKey = require('../config').jwtKey;
const jwtExpirySeconds = 3600; // one hour expiry time

module.exports = {
  init: (app, passport) => {
    app.post('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err || info) {
          return res.status(401).end();
        }
        const token = jwt.sign(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          },
          jwtKey,
          {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds
          }
        );
        console.log('token:', token);

        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds, so we multiply by 1000
        res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 });
        res.end();
      })(req, res, next);
    });
  }
};
