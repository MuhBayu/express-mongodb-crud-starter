const jwt      = require("jsonwebtoken");
const config   = require('../config/common');

module.exports = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.secret_key, function(err, decoded) {
            if(!err) {
                next();
            } else {
                console.log(err)
                return res.json({success:false, error_name:err.name, message:'Error access token'})
            }
        });
    } else {
        return res.json({success:false, message:'Error access token'})
    }
}