const bcrypt = require('bcrypt');
const User = require('../../mongo/model/user');
const ObjectId = require('mongodb').ObjectID;

module.exports.init = app => {
  app.route('/change-password').post((req, res) => {
    User.findOne({ _id: new ObjectId(req.body.id) }, (err, mongoResponse) => {
      if (err) {
        return next(err);
      }
      bcrypt.compare(
        req.body.currentPassword,
        mongoResponse.password,
        (err2, match) => {
          if (err2) {
            return next(err);
          }
          if (!match) {
            console.log('WENT NO MATCH');
            return res.status(401).json({ success: false });
          }
          // if currentPassword from FE matches the password from the database
          bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
            if (err) {
              return next(err);
            }
            const findQuery = {
              _id: new ObjectId(req.body.id)
            };
            const updateData = {
              password: hash
            };

            User.findOneAndUpdate(
              findQuery,
              updateData,
              {
                upsert: false,
                useFindAndModify: false,
                new: true
              },
              (err, user) => {
                if (err) {
                  return next(err);
                }
                if (!user) {
                  res.status(401).json({ success: false });
                }
                res.clearCookie('token').json({
                  success: true
                });
              }
            );
          });
        }
      );
    });
  });
};
