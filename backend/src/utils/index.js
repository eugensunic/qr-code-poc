const jwt = require('jsonwebtoken');
const jwtKey = require('../config').jwtKey;

const tokenValid = (req, res, next) => {
  // We can obtain the session token from the requests cookies, which come with every request
  const token = req.cookies.token;
  console.log('Token cookie value:', token);

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
    if (typeof payload1 !== 'undefined') {
      console.log('Jwt payload valid', payload);
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

module.exports = {
  tokenValid: tokenValid
};
