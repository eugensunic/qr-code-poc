const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api/overview-content', '/api/create-content', '/register', '/login'],
    proxy({
      target: 'http://localhost:5000',
      secure: false,
      changeOrigin: true
    })
  );
};
