const multer = require('multer');

// Configuration for multer to store uploaded files
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

// Function to validate file type
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new Error('Only images are allowed'));
  }
  cb(null, true);
};

// Creating a multer instance with the configured storage and file filter
const uploadSingleImage = multer({
  storage,
  fileFilter,
}).single('image');

module.exports = uploadSingleImage;
