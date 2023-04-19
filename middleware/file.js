const multer = require('multer');
const uidGenerator = require('node-unique-id-generator');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/img')
  },
  filename(req, file, cb) {
    const id = uidGenerator.generateUniqueId();
    req.body.id = id;
    console.log(file)
    cb(null, `${id}.${file.originalname.split('.')[1]}`)
  }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

module.exports = multer({
  storage, fileFilter
});
