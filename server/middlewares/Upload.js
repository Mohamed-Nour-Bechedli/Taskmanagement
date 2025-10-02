const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads');

// Ensure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Sanitize filenames (remove spaces & special chars)
const sanitizeFilename = (name) => {
  return name
    .normalize('NFD')                  // split accents
    .replace(/[\u0300-\u036f]/g, '')   // remove accents
    .replace(/[^a-zA-Z0-9.]/g, '_');   // replace others with _
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeName = sanitizeFilename(file.originalname);
    cb(null, Date.now() + '-' + safeName);
  }
});

const upload = multer({ storage });

module.exports = upload;

