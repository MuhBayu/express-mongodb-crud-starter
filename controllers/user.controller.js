var mongoose    = require('mongoose');
var User        = mongoose.model('User');
var bcrypt      = require('bcrypt');
var config      = require('../config/common');
const jwt = require("jsonwebtoken");
var moment = require('moment')
const multer        = require('multer')
var uploadAvatar = require('../helpers/uploadImage');

exports.upload = (req, res) => {
	var input = req.body;
	// var upload = multer({
	// 	storage: ImageStorage,
	// }).any()
	var fields = {
		'id': input.id,
		'username': input.username,
	}
	// console.log(input)
	var uploaddulu = new Promise((resolve, reject)  => {
		if(req.files && req.files.length) {
			uploadAvatar.single('avatar')(req, res, (err) => {
				if (err) {
					reject(err)
				} else {
					fields['profile_pic'] = filename;
					resolve(fields)
				}
			})
		} else {
			resolve(fields);
		}
	})
	uploaddulu.then(response => {
		console.log(response)
	}).catch(err => {
		console.log(err)
	})
	res.json({success:true, message:'Upload file successful '})
	// console.log(fields);
}

exports.updateProfile = (req, res) => {
	let input = req.body;
	// console.log(input)
	// return res.json({success: true, message: req.body})
	var uploaddulu = new Promise((resolve, reject)  => {
		if(req.files && req.files.length) {
			var uploads = uploadAvatar.single('avatar');
			uploads(req, res, (err) => {
				// console.log(Date.now());
				if (err) {
					console.log(err);
					reject(err)
				} else {
					console.log(filename)
					input['profile_pict'] = filename;
					resolve(input)
				}
			})
		} else {
			resolve(input);
		}
	})
	uploaddulu.then(response => {
		console.log(response)
		User.findById(input.id, (err, data) => {
			if(err) {
				return res.json({success: false, message: "Error updating data"})
			} else {
				data.username = input.username
				data.name = input.name
				if(input.profile_pict !== undefined) data.profile_pict = input.profile_pict 
				data.address = input.address
				data.phone_number = input.phone_number
				// data.hashed_password = 'secret'
				data.save()
				return res.json({success: true, message: 'Success updating data'})
			}
		})
	}).catch(err => {
		console.log(err)
	})
}

module.exports.authenticate = async (req, res) => {
    let { email, password } = req.body;
    if(!email || !password) return res.json({success:false,})
    await User.findOne({email:email}).select('_id name username email password').exec(function(err,data) {
        if(err) {
            return res.json({success: false,message: "Error find data"})
        } else if(data !== null) {
            if(bcrypt.compareSync(password, data.password)) {
                const opts = {}
                opts.expiresIn = 900;  //token expires in 5min
                const token = jwt.sign({_id:data._id, email:email}, config.secret_key, opts);
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

module.exports.detail = async (req, res) => {
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
	if(req.user_id !== req.params.id) {
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
	} else {
		return res.json({success: false, message:  "Delete failed, because is your data"});
	}
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