var methodOverride = require('method-override'),
bodyParser     = require('body-parser'),
sanitizer      = require('express-sanitizer'),
mongoose       = require('mongoose'),
express        = require('express'),
app            = express();
    
// app config   

mongoose.connect('mongodb://localhost/restful_blog');   
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(sanitizer());



// mongoose schema/model config

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//     title: 'First blog',
//     image: 'https://cdn.pixabay.com/photo/2015/05/15/14/20/landscape-768423_960_720.jpg',
//     body: 'Welcome to my blog. You are reading my first blog bla bla bla bla'
// });

// RESTful routes

app.get('/', function(req, res){
    res.redirect('/blogs');
});
// index route
app.get('/blogs', function(req, res){
    Blog.find({}, function(error, blogs){
        if(error){
            console.log(error);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});
//new route
app.get('/blogs/new', function(req, res){
    res.render('new');    
});

// create route 
app.post('/blogs', function(req, res){
   // create a blog
   req.body.blog.body = req.sanitize(req.body.blog.body) // this blocks malicious code that user might enter in body of the blog
    Blog.create(req.body.blog, function( error, newBlog){
       if(error){
           console.log(error);
           res.render('new');
       } else {
           //redirect to index
            res.redirect('/blogs');  
       }
   });
});

// show route

app.get('/blogs/:id', function(req, res){ // '/blogs/:id' and req.params.id target to same id dooh..
    Blog.findById(req.params.id, function(error, foundBlog){
        if(error){
            console.log(error);
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    });
});

// edit route

app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(error, foundBlog){
        if(error){
            console.log(error);
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

// update route 

app.put('/blogs/:id', function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog){
        if(error){
            console.log(error);
            res.render('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id );
        }
    });
});

// delete route

app.delete('/blogs/:id', function(req, res){
    // destroy blog
      Blog.findByIdAndRemove(req.params.id, req.params.body, function(error){
          if(error){
              console.log(error);
              res.redirect('/blogs');
          } else {
              // redirect somewhere
              res.redirect('/blogs');
          }
      });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Your server has started')});