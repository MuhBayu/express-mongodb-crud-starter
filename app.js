const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const routes = require('./routes')(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

app.use('/api', routes);

app.listen(3000);
console.log("Listening to PORT 3000");