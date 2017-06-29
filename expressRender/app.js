var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index'); // including ejs file 
});

app.get('/deathBy/:thing', function(req, res){
    var thing = req.params.thing;
    res.render('views', {thingVar: thing}); // embeding javascript variables into ejs
});

app.get('/posts', function(req, res){
   var posts = [
            {title: 'Post1sdasadasdasd', author: 'Suzty'},
            {title: 'Post2sdasdasdasd', author: 'Groshass'},
            {title: 'Postdfsdfsfsdf3', author: 'Tszutss'}
       ]; 
       res.render('posts', {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Your server has started')});
