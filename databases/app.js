var mongoose = require('mongoose');
var express = require('express');

mongoose.connect("mongodb://localhost/demo");

var unitSchema = new mongoose.Schema({
    name: String,
    health: Number,
    type: String
});

var Unit = mongoose.model("Unit", unitSchema);

// adding new units to database /////////////

// var marine = new Unit({
//     name: 'Captain',
//     health: 2900,
//     type: 'commander'
// });

// marine.save(function(error, unit){
//     if(error){
//         console.log("Something is not right :/");
//     } else {
//         console.log('The unit was saved to database:');
//         console.log(unit);
//     };
// })

Unit.create({
    name: 'Dreadnought',
    health: 4200,
    type: 'armored'
},function(error, unit){
    if(error) {
        console.log('Something is not right :/');
        console.log(error);
    } else {
        console.log('Unit is added to database:');
        console.log(unit);
    };
});

// retrieve all units from database  //////////////////

Unit.find({}, function(error, units){
    if(error) {
        console.log('Something is not right :/');
        console.log(error);
    } else {
        console.log(units);
    };
});