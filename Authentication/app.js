var express             = require('express'),
app                     = express(),
User                    = require('./models/user'),
mongoose                = require('mongoose'),
passport                = require('passport'),
bodyParser              = require('body-parser'),
LocalStrategy           = require('passport-local'),
passportLocalMongoose   = require('passport-local-mongoose');

    
// app setup    //////////////

app.use(require('express-session')({
    secret: 'This looks complicated',
    resave: false,
    saveUninitialized: false
}));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth_demo');
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: true
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// routes /////////

app.get('/', function(req, res ){
    res.render('home');
});

app.get('/secret', isLogedIn, function(req, res){
    res.render('secret');
});


// Auth routes ////

// show signUp form
app.get('/register', function(req, res) {
    res.render('register');
});
// handle user signUp
app.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, function(){
                res.redirect('/secret');
            });
        }
    });
});

// login routes

// render login form
app.get('/login', function(req, res){
   res.render('login'); 
});
// handle login process logic
// middleware is a code that runs before callback here
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function(req, res){
    
});
// logout route
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


function isLogedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Server Up and Going!');
});