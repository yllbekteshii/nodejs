const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/gif"
    ) {
      callback(null, true);
    } else {
      console.log('Only png, jpg, jpeg, and gif file types are supported!');
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 10 // 10 MB file size limit
  }
});

module.exports = upload;
