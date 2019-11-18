const proxy = require('http-proxy-middleware');
const { contentEndpoint, userAccessEndpoint } = require('./config');

const {
  CREATE_CONTENT,
  OVERVIEW_CONTENT,
  OVERVIEW_CONTENT_EDIT,
  OVERVIEW_CONTENT_DELETE
} = contentEndpoint;

const {
  REGISTER,
  LOGIN,
  LOGOUT,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD
} = userAccessEndpoint;

module.exports = function(app) {
  const proxyRoutes = [
    CREATE_CONTENT,
    OVERVIEW_CONTENT,
    OVERVIEW_CONTENT_EDIT,
    OVERVIEW_CONTENT_DELETE,
    REGISTER,
    LOGIN,
    LOGOUT,
    CHANGE_PASSWORD,
    FORGOT_PASSWORD,
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
