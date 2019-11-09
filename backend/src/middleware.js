const bodyParser = require("body-parser");

module.exports.init = app => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
};
