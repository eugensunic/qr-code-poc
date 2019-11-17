const bcrypt = require('bcrypt');
const User = require('../../mongo/model/user');

module.exports.init = app => {
  app.route('/user-registration').post((req, res) => {
    User.findOne({ email: req.body.email }, (err, mongoResponse) => {
      if (err) {
        return res.status(500).end();
        // return next(err);
      }
      console.log(mongoResponse);
      if (!!mongoResponse) {
        res.json({
          isAlreadyRegistered: true
        });
      } else {
        saveUserToDatabase(
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.password,
          req.body.registrationTime,
          res
        );
      }
    });
  });
};

function saveUserToDatabase(firstName, lastName, email, password, time, res) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).end();
      // return next(err);
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
      .catch(() => res.status(500).end());
  });
}
