const utils = require('../utils');

module.exports.init = app => {
  app
    .route('/api/overview-content')
    .get(utils.tokenValid, (req, res, next) => {
        // get all saved qr code content from the mongo collection
    });
};
