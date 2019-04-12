const UserController = require('../controllers/user.controller');
var multer = require('multer');
var uploadImage = require('../helpers/uploadImage');
module.exports = (app) => {
    app.get("/",function(req, res){
        res.json({"success" : true,"message" : "Hello World"});
    });
    app.prefix('/api', function(api) {
        api.prefix('/users', function(user) {
            user.route("/")
                .get(UserController.read)
                .post(UserController.create);
            user.route("/:id")
                .get(UserController.detail)
                .delete(UserController.destroy)
                .put(UserController.update)
            user.post('/update-profile', uploadImage.any(), UserController.updateProfile)
        })
            
            api.post('/auth', UserController.authenticate);
            api.post('/register', UserController.register);
            api.post('/upload', uploadImage.any(), UserController.upload)
        })
    app.get("/insertDemo", UserController.insertDemo)
    // app.prefix('/api/users', function(user) {
        
    // })
};