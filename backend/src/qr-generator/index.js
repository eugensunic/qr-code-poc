const utils = require('../utils');
const QRCode = require('qrcode');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports.init = app => {
  app.route('/image-content').post(upload.single('file'), (req, res, next) => {
    // normal user flow for updating image with deletion inside then
    console.log('image is:', req.file); // for image
    console.log('other data is:', req.body); // for image

    QRCode.toDataURL('I am a pony!', function(err, url) {
      if (err) {
        return;
      }
      res.end();
      // console.log('Generated QR code', url);
    });
  });
};
