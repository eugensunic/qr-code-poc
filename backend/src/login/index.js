module.exports = {
  init: (app, passport) => {
    app.post('/api/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err || info.error) {
          return res.status(401).end();
        }

        res.json({ successLogin: true });
      })(req, res, next);
    });
  }
};
