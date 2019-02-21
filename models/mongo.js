const mongoose = require("mongoose");
const config = require('../config');
mongoose.connect(config.mongo_server, {useNewUrlParser:true});
const mongoSchema =   mongoose.Schema;

const userSchema = mongoSchema({
    "name" : String,
    "username" : String,
    "email" : String,
}, {
    timestamps: true
});

// create model if not exists.
module.exports = mongoose.model('users',userSchema);