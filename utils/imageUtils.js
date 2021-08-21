const path = require('path');
const uuid = require('uuid');

const imageSetup = (image) => {
  const fileName = uuid.v4() + '.jpg';
  const img = image.mv(path.resolve(__dirname, '..', fileName));
  console.log(image);
  console.log(img);
  return fileName;
};

module.exports = { imageSetup };
