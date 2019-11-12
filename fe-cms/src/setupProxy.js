const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  const proxyRoutes = [
    '/overview-content',
    '/create-content',
    '/register',
    '/auth',
    '/logout'
  ];
  app.use(
    proxyRoutes,
    proxy({
      target: 'http://localhost:5000',
      secure: false,
      changeOrigin: true
    })
  );
};
