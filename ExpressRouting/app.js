// express practice

var express = require('express');
var app = express();
var sounds = {
    pig: '\"oink oink\".',
    dog: "\"woof woof\".",
    cow: "\"mooooo\"."
};

//homepage route

app.get('/', function(req, res) {
    res.send('Hello there, welcome to express demo');
});

//speak route
app.get('/speak/:animal', function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send('The ' + animal + ' says ' + sound);
});

// repeat route

app.get('/repeat/:message/:times', function(req, res) {

    var toRepeat = req.params.message;
    var repeatTimes = Number(req.params.times);
    var result = '';
    for(var i = 0; i < repeatTimes; i++) {
        result += toRepeat + " ";
    };
    res.send(result); // send resolve can be sent only once
    
});


// star route
app.get('*', function(req, res) {
    res.send('wtf are you doing with your life?!');
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server has started');
});
