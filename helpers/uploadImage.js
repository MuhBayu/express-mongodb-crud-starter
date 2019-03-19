const multer        = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let path = './public/uploads/';
        callback(null, path)
    },
    filename: function (req, file, callback) {
        var fileObj = {
            "image/png": ".png",
            "image/jpeg": ".jpeg",
            "image/jpg": ".jpg"
        };
        if (fileObj[file.mimetype] == undefined) {
            callback(new Error("file format not valid"));
        } else {
            callback(null, Date.now() + fileObj[file.mimetype])
        }
    }
})
module.exports = multer({ storage: storage })