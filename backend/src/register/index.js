const bcrypt = require('bcrypt');
const User = require('../mongo/model/user');

module.exports.init = app => {
  app.route('/api/register').post((req, res, next) => {
    console.log('went to register!!!!', req.body);
    User.find({ email: req.body.email }, (err, mongoResponse) => {
      if (err) {
        return next(err);
      }
      console.log('checking email-------------------', mongoResponse);
      if (mongoResponse.length > 0) {
        console.log('user exists ERROR');
        res.send({
          isAlreadyRegistered: true
        });
      } else {
        console.log('user doesnt exist OK, save user to database');
        saveUserToDatabase(
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.password,
          req.body.registrationTime,
          res,
          next
        );
      }
    });
  });
};

function saveUserToDatabase(
  firstName,
  lastName,
  email,
  password,
  time,
  res,
  next
) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      registrationTime: time
    });
    user
      .save()
      .then(_ => {
        res.send({
          registrationSuccess: true
        });
        console.log('saved to database');
      })
      .catch(() => next(err));
  });
}
