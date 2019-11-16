const utils = require('../../utils');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const User = require('../../mongo/model/user');

module.exports.init = app => {
  const SERVICE_NAME = 'gmail';
  const SUBJECT = 'New password';

  app.route('/forgot-password').post((req, res) => {
    const RECIPIENT = req.body.email;
    const password = generator.generate({
      length: 10,
      numbers: true
    });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.status(500).end();
        // return next(err);
      }
      const findQuery = {
        email: RECIPIENT
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
          // user not registered with given account
          if (!user) {
            res.status(401).json({ success: false });
          }

          const MESSAGE_CONTENT = 'Your new password is:' + password;

          utils
            .sendMail(SERVICE_NAME, RECIPIENT, SUBJECT, MESSAGE_CONTENT)
            .then(_ =>
              res.json({
                success: true
              })
            )
            .catch(err => {
              res.status(500).end();
              console.log('Error ocurred: ', err);
            });
        }
      );
    });
  });
};
