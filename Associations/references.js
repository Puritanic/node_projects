var mongoose = require('mongoose');
var Post = require('./models/post');
var User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog-demo-2');






// --------------------------------------------

// Post.create({ // create a post
//     title: 'How to know how pt.4',
//     content: 'This was a presentation by Philip Roberts at JSConf EU in 2014. The event loop is important to how Node.js works.'
// }, function(err, newPost){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(newPost);
//         User.findOne({ // find the user
//             name: 'John Doe'
//         }, function(err, foundUser){
//             if(err){
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(newPost); // push that post into users posts
//                 foundUser.save(function(err, data){ // save the user
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log(data); // print out data
//                     }
//                 });
//             }
//         });
//     }
// });

// User.create({
//     email: 'john@doe.com',
//     name: 'John Doe'
    
// })

// find the user
// find all posts for that user

User.findOne({name: 'John Doe'}).populate('posts').exec(function(err, user){ // retrieve posts data from id-s
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
})