const utils = require('../utils');
const ImageMuseum = require('../mongo/model/image-data');

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
    .post(utils.tokenValid, (req, res, next) => {
      const findQuery = {
        _id: new ObjectId(req.body.itemId)
      };

      const updateData = {
        $set: {
          imageName: req.body.imageName,
          imageDescription: req.body.imageDescription,
          qrCode: req.body.qrCode,
          image: {
            originalName: req.body.image.originalName,
            fileName: req.body.image.fileName,
            path: req.body.image.path,
            mimeType: req.body.image.mimeType
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
  let index = 0;
  return data
    .map(x => ({
      id: x._id,
      imageName: x.imageName,
      imageDescription: x.imageDescription,
      qrCode: x.qrCode,
      path: getImagePath(x.image.path, 'museum-images')
    }))
    .reduce(
      (acc, x, i) => {
        if (i % 3 === 0 && i !== 0) {
          acc.push([]);
          ++index;
        }
        acc[index].push(x);
        return acc;
      },
      [[]]
    );
}

function getImagePath(pathToFile, folderName) {
  return pathToFile
    ? pathToFile.substring(pathToFile.indexOf(folderName))
    : 'default-image.png';
}
