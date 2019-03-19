var mongoose    = require('mongoose');
var User        = mongoose.model('User');
var bcrypt      = require('bcrypt');
var config      = require('../config/common');
const jwt = require("jsonwebtoken");
var uploadImage = require('../helpers/uploadImage');
var moment = require('moment')

exports.upload = (req, res) => {
    var upload = uploadImage.single('avatar')
    upload(req, res, (err) => {
        if (err) {
            res.json({success:false, message:'Failed to upload file'})
        } else {
            res.json({success:true, message:'Upload file successful'})
        }
    })
}

module.exports.authenticate = (req, res) => {
    let { email, password } = req.body;
    if(!email || !password) return res.json({success:false,})
    User.findOne({email:email}).select('_id name username email password').exec(function(err,data) {
        if(err) {
            return res.json({success: false,message: "Error find data"})
        } else if(data !== null) {
            if(bcrypt.compareSync(password, data.password)) {
                const opts = {}
                opts.expiresIn = 600;  //token expires in 5min
                const token = jwt.sign({email:email}, config.secret_key, opts);
                data['token'] = token;
                var newData = {
                    _id:data._id, username:data.username,
                    email:data.email, token:token,
                }
                data.last_login = moment().format();
                data.save()
                return res.json({success: true, attributes: newData})
            } else {
                return res.json({success: false,message: "Error find data"})
            }
        } else {
            return res.json({success: false,message: "Error find data"})
        }
    });
}

module.exports.insertDemo = (req, res) => {
    var db = new User();
    db.name = 'Demo';
    db.username = 'demo';
    db.address = '4970  Stratford Court, North Carolina 27513';
    db.phone_number = '9196789001';
    db.email = 'demo@demo.com';
    db.password = 'demo123';
    db.save((err) => {
        if(err) {
            res.send('Input error')
        } else {
            res.send('Input success')
        }
    });
}

module.exports.register = (req, res) => {
    var db = new User();
    var input = req.body
    db.name = input.name;
    db.username = input.username;
    db.address = input.address
    db.phone_number = input.phone_number;
    db.email = input.email;
    db.password = input.password;
    db.save((err) => {
        if(err) {
            return res.json({success: false, message: err.errmsg})
        } else {
            return res.json({success:true, message:'Success register'})
        }
    })
}

module.exports.create = (req, res) => {
    var db = new User();
    var input = req.body;
    db.name = input.name; 
    db.username = input.username;
    db.email = input.email;
    db.password = input.password;
    db.save((err) => {
        if(err) {
            let message = [];
            for(let i in err.errors){
                message.push(err.errors[i].message);
            }
            return res.json({success: false, message: message[0]})
        } else {
            return res.json({success: true,message: "Data added"})
        }
    });
}

module.exports.read = (req, res) => {
    User.find({}, (err,data) => {
        var avatarUrl = req.protocol + '://' + req.get('host') + '/uploads/avatar/'
        if(err) {
            return res.json({success: false,message: "Error fetching data"})
        } else {
            return res.json({success: true, baseUrl: avatarUrl, attributes: data})
        }
    });
}

module.exports.detail = (req, res) => {
    User.findById(req.params.id).select('_id username name address phone_number email profile_pict last_login').exec((err,data) => {
        var avatarUrl = req.protocol + '://' + req.get('host') + '/uploads/avatar/'
        if(err) {
            return res.json({success: false, message:  "Error fetching data"});
        } else {
            delete data.password
            return res.json({success: true, baseUrl: avatarUrl, attributes: data});
        }
    });
}

module.exports.destroy = (req, res) => {
    User.findById(req.params.id, (err) => {
        if(err) {
            return res.json({success: false,message: "Error fetching data"});
        } else {
            User.deleteOne({_id: req.params.id}, (err) => {
                if(err) {
                    return res.json({success: false, message: "Error deleting data"});
                } else {
                    return res.json({success: true, message: "Data id '"+req.params.id+"' is deleted!"});
                }
            });
        }
    });
}

module.exports.update = (req, res) => {
    const input = req.body
    User.findById(req.params.id, (err, data) => {
        if(err) {
            return res.json({success: false, message: "Error delete data"})
        } else {
            data.username = input.username
            data.name = input.name
            data.email = input.email
            data.hashed_password = 'secret'
            data.save((err) => {
                if(err) {
                    return res.json({'success': false, 'message': 'Error'})
                } else {
                    return res.json({'success': true, 'message': 'Data is updated'})
                }
            })
        }
    })
}