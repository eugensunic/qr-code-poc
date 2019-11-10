const bodyParser = require('body-parser');
const express = require('express');

const localMiddleware = require('./login/middleware');

module.exports.init = (app, passport) => {
  // JSON body post requests
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  // file upload
  app.use(express.static('uploads'));

  // passport.js middleware
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  localMiddleware.localStrategyMiddleware(passport);
};
