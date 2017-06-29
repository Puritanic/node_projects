var express         = require('express'),
    methodOverride  = require('method-override'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    app             = express();
    
    

mongoose.Promise = global.Promise;
var url = process.env.DATABASEURL || 'mongodb://localhost/blog';
mongoose.connect(url);


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function(req, res){
    res.render('home');
});

app.get('/blog', function(req, res){
    res.render('blog');
});

app.get('/projects', function(req, res){
    res.send('This will be maybe a project page...');
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Blog is up and running');
})