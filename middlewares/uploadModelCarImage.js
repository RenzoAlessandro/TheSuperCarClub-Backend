const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/modelsCars')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploadMulter = multer({
    storage: storage,
})

const upload = uploadMulter.single("carImage");

module.exports = upload;