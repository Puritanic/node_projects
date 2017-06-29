var express = require('express');
var app = express();
var request = require('request');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('home');
});

app.get('/results', function(req, res){
    
    var movieSearch = req.query.search;
    var url = "http://omdbapi.com/?s=" + movieSearch + "&apikey=thewdb";
    console.log(req.query.search); //debugged bastard
    
    request(url, function(error, response, body){
        
        var parsedData = JSON.parse(body); // transforming string request inot objects
        if( !error && response.statusCode === 200) {
            res.render('results', {parsedData: parsedData, movieSearch: movieSearch});
        } else {
            res.send('There seems to be a problem!');
            console.log(error);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Your server has started')});