var mongoose = require('mongoose');

// user model - email, name -------------------

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId, // store data like object id-s
        ref:  'Post'
    }]
});

module.exports = mongoose.model('User', userSchema);