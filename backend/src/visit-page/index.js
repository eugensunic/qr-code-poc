const ImageMuseum = require('../mongo/model/image-data');
const utils = require('../utils');

module.exports.init = app => {
  app.route('/visitor').post(function(req, res) {
    ImageMuseum.findOne(
      {
        qrCodeUniqueId: req.body.qrCodeId
      },
      (err, obj, next) => {
        if (err) {
          return next(err);
        }

        userObject = {
          imageName: obj.imageName,
          imageDescription: obj.imageDescription,
          imageSrc: utils.getImagePath(obj.image.path, 'museum-images')
        };

        res.json(userObject);
      }
    );
  });
};
