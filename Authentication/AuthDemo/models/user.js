
var mongoose            = require('mongoose'),
passportLocalMongoose   = require('passport-local-mongoose'); // Auth

// User schema

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); // adds passport methods and functionality to user

module.exports = mongoose.model('User', UserSchema);