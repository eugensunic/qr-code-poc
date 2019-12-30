const utils = require('../utils');
const config = require('../config');

const QRCode = require('qrcode');
const multer = require('multer');
const ImageMuseum = require('../mongo/model/image-data');
const upload = multer({ dest: 'uploads/museum-images' });
const uuidv4 = require('uuid/v4');

module.exports.init = app => {
  app.route('/create-content').post(utils.tokenValid, upload.single('file'), (req, res, next) => {
    const imageName = req.body.file[0];
    const imageDescription = req.body.file[1];
    const uniqueId = uuidv4();

    QRCode.toDataURL(config.HOST_PREFIX + '/view-image/' + uniqueId, (err, qrCodeStream) => {
      if (err) {
        return next(err);
      }
      const imageMuseum = new ImageMuseum({
        imageName: imageName,
        imageDescription: imageDescription,
        qrCode: qrCodeStream,
        qrCodeUniqueId: uniqueId,
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
    });
  });
};
