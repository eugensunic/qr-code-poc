module.exports = {
  init: (app, passport) => {
    console.log('reached login route')
    app.post('/api/login', passport.authenticate('local'), (req, res, next) => {
      console.log('here')
      res.json({ druck: 'druck' });

      return;
    });
  }
};
