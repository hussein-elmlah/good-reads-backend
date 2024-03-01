const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    file.originalname.split('.').pop();
    const uniqueFilename = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new Error('Only images are allowed'));
  }
  cb(null, true);
};

const uploadSingleImage = multer({
  storage,
  fileFilter,
}).single('image');

module.exports = uploadSingleImage;
