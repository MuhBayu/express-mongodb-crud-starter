var mongoOp = require("../models/mongo");

module.exports.create = (req, res) => {
    var db = new mongoOp();
    var input = req.body;
    db.name = input.name; 
    db.username = input.username;
    db.email = input.email;
    db.save((err) => {
        if(err) {
            return res.json({"success": false,"message": "Error adding data"})
        } else {
            return res.json({"success": true,"message": "Data added"})
        }
    });
}

module.exports.read = (req, res) => {
    mongoOp.find({}, (err,data) => {
        if(err) {
            return res.json({"success": false,"message": "Error fetching data"})
        } else {
            return res.json({"success": true, "attributes": data})
        }
    });
}

module.exports.detail = (req, res) => {
    mongoOp.findById(req.params.id, (err,data) => {
        if(err) {
            return res.json({"success": false, "message":  "Error fetching data"});
        } else {
            return res.json({"success": true, "attributes": data});
        }
    });
}

module.exports.destroy = (req, res) => {
    mongoOp.findById(req.params.id, (err) => {
        if(err) {
            return res.json({"success": false,"message": "Error fetching data"});
        } else {
            mongoOp.deleteOne({_id: req.params.id}, (err) => {
                if(err) {
                    return res.json({"success": false, "message": "Error deleting data"});
                } else {
                    return res.json({"success": true, "message": "Data id '"+req.params.id+"' is deleted!"});
                }
            });
        }
    });
}

module.exports.update = (req, res) => {
    const input = req.body
    mongoOp.findById(req.params.id, (err, data) => {
        if(err) {
            return res.json({"success": false, "message": "Error delete data"})
        } else {
            data.username = input.username
            data.name = input.name
            data.email = input.email
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