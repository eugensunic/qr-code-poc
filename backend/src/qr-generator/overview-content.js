const utils = require('../utils');
const QRCode = require('qrcode');
const multer = require('multer');
const upload = multer({ dest: 'uploads/museum-images' });
const ImageMuseum = require('../mongo/model/image-data');
const ObjectId = require('mongodb').ObjectID;

module.exports.init = app => {
  app.route('/overview-content').get(utils.tokenValid, (req, res, next) => {
    ImageMuseum.find({}, function(err, data) {
      if (err) {
        res.status(500).end();
      }
      if (!data.length) {
        return res.json({});
      }
      data = data.map(x => ({
        id: x._id,
        imageName: x.imageName,
        imageDescription: x.imageDescription,
        qrCode: x.qrCode,
        path: getImagePath(x.image.path, 'museum-images')
      }));
      res.json(data);
    });
  });

  app
    .route('/overview-content/edit')
    .post(utils.tokenValid, upload.single('file'), (req, res, next) => {
      console.log('in EDIT:', req.file, req.body);

      const imageId = req.body.file[0];
      const imageName = req.body.file[1];
      const imageDescription = req.body.file[2];

      QRCode.toDataURL(
        'https://www.google.com/' + imageName,
        (err, qrCodeStream) => {
          if (err) {
            return;
          }

          const findQuery = {
            _id: new ObjectId(imageId)
          };

          let objUpdate = null;
          if (isObjectEmpty(req.file)) {
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
                path: getImagePath(doc.image.path, 'museum-images')
              };

              res.json(updatedObject);
            }
          );
        }
      );
    });

  app
    .route('/overview-content/delete')
    .post(utils.tokenValid, (req, res, next) => {
      ImageMuseum.findByIdAndRemove(req.body.itemId, function(err) {
        if (err) {
          res.status(500).end();
        }
        res.json({ delete_successful: true });
      });
    });
};

function getImagePath(pathToFile, folderName) {
  return pathToFile
    ? pathToFile.substring(pathToFile.indexOf(folderName))
    : 'default-image.png';
}

function isObjectEmpty(obj) {
  return !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);
}
