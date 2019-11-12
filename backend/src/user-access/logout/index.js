module.exports.init = app => {
  app.post('/logout', (req, res, next) => {
    console.log('went to logout');
    res.clearCookie('token');
    res.end()
  });
};
