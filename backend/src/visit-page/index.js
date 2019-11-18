const ImageMuseum = require('../mongo/model/image-data');
var fs = require('fs');

module.exports.init = app => {
  app.get('/subdomain/:id', function(req, res) {
    console.log('PARAMS ARE', req.params);
    ImageMuseum.find(
      {
        qrCodeUniqueId: req.params.id
      },
      (err, image, next) => {
        if (err) {
          return next(err);
        }
        console.log(image);
        console.log(__dirname);

        const html = fs.readFileSync(__dirname + '/html-files/home.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);

        return;
      }
    );
    // contact database and retrieve image data
    // for the client imageName, imageDescription, imageSrc
    // serve static html;
  });
};
