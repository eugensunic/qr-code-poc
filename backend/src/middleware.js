const express = require('express');
const localMiddleware = require('./user-access/login/middleware');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports.initPreMiddleware = (app, passport) => {
  // cookie parser
  app.use(cookieParser());

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

module.exports.initErrorRoutingMiddleware = (app, passport) => {
  app.use(function(err, req, res, next) {
    console.log('WENT TO MIDDLEWARE AFTER DONE!!!');
    if (err) {
      res.status(500).end();
    }
  });
};
