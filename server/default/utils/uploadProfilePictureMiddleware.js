const multer = require('multer')

module.exports = multer({
    limits: {
        fileSize: 4 * 1024 * 1024 * 100000,
    }
})
