const jwt = require('jsonwebtoken');
const jwtKey = require('../config').jwtKey;
const nodemailer = require('nodemailer');
const fs = require('fs');
const credentials = require('dotenv').config().parsed;

const tokenValid = (req, res, next) => {
  // We can obtain the session token from the requests cookies, which come with every request
  const token = req.cookies.token;
  // console.log('Token cookie value:', token);

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match

    payload = jwt.verify(token, jwtKey);
    // console.log('payload value', payload);
    if (typeof payload !== 'undefined') {
      // console.log('Jwt payload valid', payload);
      next();
    }
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
};

const sendMail = (serviceName, recipientMail, subjectName, contentText) => {
  const message = {
    from: serviceName,
    to: recipientMail,
    subject: subjectName,
    text: contentText
  };

  let transport = nodemailer.createTransport({
    service: serviceName,
    auth: {
      user: credentials.EMAIL,
      pass: credentials.PASSWORD
    }
  });

  return new Promise((resolve, reject) => {
    transport.sendMail(message, err => {
      if (err) {
        reject();
      }
      resolve();
    });
  });
};

function deleteImageFile(imagePath) {
  return new Promise((res, rej) => {
    fs.unlink(imagePath, err => {
      if (err) {
        console.log(
          err,
          'Error ocurred while trying to delete user profile image'
        );
        rej();
      }
      res();
    });
  });
}

module.exports = {
  tokenValid: tokenValid,
  sendMail: sendMail,
  deleteImageFile: deleteImageFile
};
