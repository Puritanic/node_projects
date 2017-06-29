var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog-demo');


// post model - title, content ---------------

var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

var Post = mongoose.model('Post', postSchema);

// user model - email, name -------------------

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model('User', userSchema);

// --------------------------------------------

// var newUser = new User({
//     email: 'bmesa@mail.gov',
//     name:  'G-man'
// });
// newUser.posts.push({
//     title: 'Unforseen qonsuquences',
//     content: 'The will be, as you will see...'
// });
// newUser.save( function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });

User.findOne({name: 'G-man'}, function(err, user){
    if(err){
        console.log(err);
    } else {
       user.posts.push({
           title: 'Combine',
           content: 'Galactic empire that wants to own all corners of universe'
       });
       user.save( function(err, user){
           if(err) {
               console.log(err);
           } else {
               console.log(user);
           }
       });
    }
});


// var newPost = new Post({
//     title: 'Black Mesa',
//     content: 'Something is happening here. Something terrifying.'
// });

// newPost.save( function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });