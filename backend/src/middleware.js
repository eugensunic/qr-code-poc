const bodyParser = require("body-parser");
const express = require("express");

module.exports.init = app => {
  app.use(bodyParser.json());
  app.use(express.static("uploads"));
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
};
