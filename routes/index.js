const UserController = require('../controllers/user.controller');


module.exports = (router) => {
    router.get("/",function(req,res){
        res.json({"success" : true,"message" : "Hello World"});
    });
    router.route("/users")
        .get(UserController.read)
        .post(UserController.create);
    router.route("/user/:id")
        .get(UserController.detail)
        .delete(UserController.destroy)
        .put(UserController.update)

    return router;
};