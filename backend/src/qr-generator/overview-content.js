const QRCode = require('qrcode');
const multer = require('multer');
const upload = multer({ dest: 'uploads/museum-images' });
const ImageMuseum = require('../mongo/model/image-data');
const ObjectId = require('mongodb').ObjectID;
const utils = require('../utils');
const config = require('../config');

module.exports.init = app => {
  app.route('/overview-content').get(utils.tokenValid, (req, res, next) => {
    ImageMuseum.find({}, function(err, data) {
      if (err) {
        next(err);
      }
      if (!data.length) {
        return res.json([]);
      }
      data = data.map(x => ({
        id: x._id,
        imageName: x.imageName,
        imageDescription: x.imageDescription,
        qrCode: x.qrCode,
        qrCodeUniqueId: x.qrCodeUniqueId,
        path: utils.getImagePath(x.image.path, 'museum-images')
      }));
      res.json(data);
    });
  });

  app
    .route('/overview-content/edit')
    .post(utils.tokenValid, upload.single('file'), (req, res, next) => {
      const imageId = req.body.file[0];
      const imageName = req.body.file[1];
      const imageDescription = req.body.file[2];
      const qrCodeId = req.body.file[3];
      const imagePath = req.body.file[4];

      QRCode.toDataURL(config.HOST_PREFIX + '/view-image/' + qrCodeId, (err, qrCodeStream) => {
        if (err) {
          return;
        }

        const findQuery = {
          _id: new ObjectId(imageId)
        };

        let objUpdate = null;
        if (utils.isObjectEmpty(req.file)) {
          objUpdate = {
            imageName: imageName,
            imageDescription: imageDescription,
            qrCode: qrCodeStream
          };
        } else {
          objUpdate = {
            imageName: imageName,
            imageDescription: imageDescription,
            qrCode: qrCodeStream,
            image: {
              originalName: req.file.originalname,
              fileName: req.file.filename,
              path: req.file.path,
              mimeType: req.file.mimetype
            }
          };

          utils
            .deleteImageFile('uploads/' + imagePath)
            .then(_ => {})
            .catch(_ => console.log('error occurred while deleting'));
        }
        const updateData = {
          $set: objUpdate
        };

        ImageMuseum.findOneAndUpdate(
          findQuery,
          updateData,
          {
            upsert: false,
            useFindAndModify: false,
            new: true
          },
          (err, doc) => {
            if (err) {
              return next(err);
            }
            // image does not exist
            if (!doc) {
              res.status(401).json();
            }

            const updatedObject = {
              id: doc._id,
              imageName: doc.imageName,
              imageDescription: doc.imageDescription,
              qrCode: doc.qrCode,
              path: utils.getImagePath(doc.image.path, 'museum-images')
            };
            // async deletion because we don't to break here, if it doesn't delete we don't care
            res.json(updatedObject);
          }
        );
      });
    });

  app.route('/overview-content/delete').post(utils.tokenValid, (req, res, next) => {
    ImageMuseum.findByIdAndRemove(req.body.itemId, function(err, deleteResponse) {
      if (err) {
        return next(err);
      }
      if (!deleteResponse) {
        return res.status(404).end();
      }

      utils
        .deleteImageFile(deleteResponse.image.path)
        .then(_ => res.json({ delete_successful: true }))
        .catch(_ => res.json({ delete_successful: true }));
    });
  });
};
