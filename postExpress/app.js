var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var friends = ['Tony', 'Sasha', 'Miranda', 'Cthulhu', 'Ezio'];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function( req, res ){
    res.render('home');
}); 
app.get('/friends', function(req, res) {
    
    res.render('friends', {friends: friends});
});
app.post('/addfriend', function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
   res.redirect('/friends');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server is up and running!');
});