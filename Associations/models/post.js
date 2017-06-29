var mongoose = require('mongoose');


// post model - title, content ---------------

var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

module.exports = mongoose.model('Post', postSchema);