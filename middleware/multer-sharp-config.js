const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage(); // Use memory storage to handle the image as a buffer

const upload = multer({
  storage: storage,
}).single('image');

const optimizeImage = async (req, res, next) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 200 }) // img optimization
      .toFormat('jpeg')
      .toBuffer();

    // File naming, file format is handled by sharp
    let name = req.file.originalname.split(' ').join('_');
    name = name.slice(0, name.lastIndexOf('.'));
    name = name + Date.now() + '.jpg';

    await sharp(buffer).toFile(`images/${name}`);

    req.file.filename = name; // does what multer.diskStorage() did

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  upload,
  optimizeImage,
};
