const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  // where to save files
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // how to name files
  filename: (req, file, callback) => {
    let name = file.originalname.split(' ').join('_');
    name = name.slice(0, name.lastIndexOf('.'));
    console.log(name);
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage: storage }).single('image'); // only images are handled
