const forgotPassword = require('./forgot-password');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');

module.exports.init = (app, passport) => {
  forgotPassword.init(app);
  register.init(app);
  login.init(app, passport);
  logout.init(app);
};
