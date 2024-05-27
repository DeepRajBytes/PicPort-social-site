const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        // Get the file extension
        const extension = path.extname(file.originalname);
        // Get the base name without the extension
        const basename = path.basename(file.originalname, extension);
        // Construct the new filename
        const fileName = `${basename}-${Date.now()}${extension}`;
        cb(null, fileName);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml"];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({
    storage: diskStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
}).single('image');

module.exports = storage;
