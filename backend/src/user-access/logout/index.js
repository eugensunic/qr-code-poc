module.exports.init = app => {
  app.post('/logout', (req, res, next) => {
    res.clearCookie('token').end();
  });
};
