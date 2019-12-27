const PREFIX = '';

module.exports.contentEndpoint = {
  CREATE_CONTENT: PREFIX + '/create-content',
  OVERVIEW_CONTENT: PREFIX + '/overview-content',
  OVERVIEW_CONTENT_EDIT: PREFIX + '/overview-content/edit',
  OVERVIEW_CONTENT_DELETE: PREFIX + '/overview-content/delete',
  VISITOR_PAGE: PREFIX + '/visitor'
};

module.exports.userAccessEndpoint = {
  REGISTER: PREFIX + '/user-registration',
  LOGIN: PREFIX + '/auth',
  LOGOUT: PREFIX + '/logout',
  CHANGE_PASSWORD: PREFIX + '/change-password',
  FORGOT_PASSWORD: PREFIX + '/forgot-password'
};

module.exports.DOMAIN_NAME = 'http://localhost:3000/';
