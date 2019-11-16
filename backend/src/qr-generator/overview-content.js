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
      const layoutArr = adjustForFrontendLayout(data);
      res.json(layoutArr);
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

          const updateData = {
            $set: {
              imageName: imageName,
              imageDescription: imageDescription,
              qrCode: qrCodeStream,
              image: {
                originalName: req.file.originalname,
                fileName: req.file.filename,
                path: req.file.path,
                mimeType: req.file.mimetype
              }
            }
          };

          ImageMuseum.findOneAndUpdate(
            findQuery,
            updateData,
            {
              upsert: true,
              useFindAndModify: false
            },
            (err, doc) => {
              if (err) {
                return next(err);
              }
              res.json({ edit_successful: true });
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

function adjustForFrontendLayout(data) {
  let index = -1;
  return data
    .map(x => ({
      id: x._id,
      imageName: x.imageName,
      imageDescription: x.imageDescription,
      qrCode: x.qrCode,
      path: getImagePath(x.image.path, 'museum-images')
    }))
    .reduce((acc, x, i) => {
      if (i % 3 === 0) {
        acc.push([]);
        ++index;
      }
      acc[index].push(x);
      return acc;
    }, []);
}

function getImagePath(pathToFile, folderName) {
  return pathToFile
    ? pathToFile.substring(pathToFile.indexOf(folderName))
    : 'default-image.png';
}
