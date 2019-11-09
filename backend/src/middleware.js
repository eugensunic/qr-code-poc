const bodyParser = require("body-parser");

module.exports.init = app => {
  // body parser
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
};
