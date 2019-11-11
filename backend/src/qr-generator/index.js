const utils = require('../utils');

const QRCode = require('qrcode');
const multer = require('multer');
const ImageMuseum = require('../mongo/model/image-data');
const upload = multer({ dest: 'uploads/' });

module.exports.init = app => {
  app
    .route('/image-content')
    .post(utils.tokenValid, upload.single('file'), (req, res, next) => {
      const imageName = req.body.file[0];
      const imageDescription = req.body.file[1];

      QRCode.toDataURL(
        'https://www.google.com/' + imageName,
        (err, qrCodeStream) => {
          if (err) {
            return;
          }
          const imageMuseum = new ImageMuseum({
            imageName: imageName,
            imageDescription: imageDescription,
            qrCode: qrCodeStream,
            image: {
              originalName: req.file.originalname,
              fileName: req.file.filename,
              path: req.file.path,
              mimeType: req.file.mimetype
            }
          });

          imageMuseum
            .save()
            .then(_ => res.json(qrCodeStream))
            .catch(err => next(err));
        }
      );
    });
};
