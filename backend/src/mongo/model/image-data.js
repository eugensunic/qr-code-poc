const mongoose = require('mongoose');

const ImageModel = new mongoose.Schema(
  {
    originalName: String,
    fileName: String,
    path: String,
    mimeType: String
  },
  {
    _id: false
  }
);

// create table for user settings
const imageSchema = new mongoose.Schema({
  imageName: String,
  imageDescription: String,
  qrCode: String,
  qrCodeUniqueId: String,
  image: ImageModel
});

module.exports = mongoose.model('contents', imageSchema);

// Image attributes
// {
//     fieldname: 'file',
//     originalname: 'Screen Shot 2018-12-26 at 11.38.30.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: 'uploads/',
//     filename: '164cb76e216663383d920d9af88c5c00',
//     path: 'uploads/164cb76e216663383d920d9af88c5c00',
//     size: 150159
// }
