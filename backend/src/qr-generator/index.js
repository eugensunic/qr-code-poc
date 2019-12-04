const createContent = require('./create-content');
const overviewContent = require('./overview-content');

module.exports.init = app => {
  createContent.init(app);
  overviewContent.init(app);
};
