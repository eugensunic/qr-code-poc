const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/login',
    proxy({
      target: 'http://localhost:5000',
      secure: false,
      changeOrigin: true
    })
  );
};
