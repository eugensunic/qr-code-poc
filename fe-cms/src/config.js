const HOST_PREFIX = process.env.HOST_PREFIX || '';

const contentEndpoint = {
  CREATE_CONTENT: HOST_PREFIX + '/create-content',
  OVERVIEW_CONTENT: HOST_PREFIX + '/overview-content',
  OVERVIEW_CONTENT_EDIT: HOST_PREFIX + '/overview-content/edit',
  OVERVIEW_CONTENT_DELETE: HOST_PREFIX + '/overview-content/delete',
  VISITOR_PAGE: HOST_PREFIX + '/visitor'
};

const userAccessEndpoint = {
  REGISTER: HOST_PREFIX + '/user-registration',
  LOGIN: HOST_PREFIX + '/auth',
  LOGOUT: HOST_PREFIX + '/logout',
  CHANGE_PASSWORD: HOST_PREFIX + '/change-password',
  FORGOT_PASSWORD: HOST_PREFIX + '/forgot-password'
};

module.exports = {
  HOST_PREFIX: HOST_PREFIX,
  contentEndpoint: contentEndpoint,
  userAccessEndpoint: userAccessEndpoint
};
