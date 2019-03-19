const express       = require("express");
express.application.prefix = express.Router.prefix = function (path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};
const dotenv = require('dotenv');
dotenv.config();
const app        = express();
const bodyParser = require("body-parser");
const fs         = require('fs');
const mongoose   = require('mongoose');   
const port       = process.env.PORT || 3000;
const path       = require("path");
const AuthToken  = require('./middleware/AuthToken');


fs.readdirSync(path.join(__dirname, "./models")).forEach(function(file) {
    if (~file.indexOf('.js')) require("./models/" + file);
});

mongoose.connect(process.env.MONGO_HOST, {useCreateIndex:true, useNewUrlParser:true});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})
app.use('/api/users/', AuthToken)

var routes = require('./routes')(app);

var server = app.listen(port, () => {
    var host = server.address().address;
    console.log("Listening http://%s:%s ",host, port);
});