const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/image-content', '/api/register', '/api/login'],
    proxy({
      target: 'http://localhost:5000',
      secure: false,
      changeOrigin: true
    })
  );
};
