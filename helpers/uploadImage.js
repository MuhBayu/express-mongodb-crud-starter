const multer        = require('multer')

var ImageStorage = multer.diskStorage({
	destination: './public/uploads/avatar/',
	filename: function (req, file, cb, fname) {
		var fileObj = {
			"image/png": ".png",
			"image/jpeg": ".jpeg",
			"image/jpg": ".jpg"
        };
        filename = Date.now() + fileObj[file.mimetype]
        destination = 'tess'
		if (fileObj[file.mimetype] === undefined) {
			cb(new Error('filetype'))
		} else {
            // input = await req.body
			cb(null, filename)
		}
	}
})
module.exports = multer({
    storage: ImageStorage,
})