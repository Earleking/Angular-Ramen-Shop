var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String,
    password:String,
    authentication: Number,
    active: Boolean,
    needsEmail: Boolean
});

module.exports = (User = mongoose.model('user', userSchema));