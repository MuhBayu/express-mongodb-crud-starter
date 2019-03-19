const mongoose    = require("mongoose");
const mongoSchema = mongoose.Schema;
var bcrypt        = require('bcrypt');


const userSchema = mongoSchema({
    name: {type : String, default : '', trim : true},
    address: {type: String, default: null},
    phone_number: {type: String, default: null},
    username: {type: String, index: { unique: true }},
    email: {type: String, index: { unique: true }},
    password: {type: String, default: null},
    profile_pict: {type: String, default: 'default.png'},
    last_login: {type: Date, default: null},
}, {
    timestamps: true
});
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
})
userSchema.path('name').required(true, 'Nama tidak boleh kosong');
userSchema.path('email').required(true, 'Email tidak boleh kosong');
userSchema.path('password').required(true, 'Password tidak boleh kosong');

module.exports = mongoose.model('User',userSchema);