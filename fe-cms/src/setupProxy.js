const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  const proxyRoutes = [
    '/overview-content',
    '/overview-content/edit',
    '/overview-content/delete',
    '/create-content',
    '/user-registration',
    '/auth',
    '/change-password',
    '/forgot-password',
    '/logout',
    '/museum-images/*'
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
