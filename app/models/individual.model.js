var express = require('express');
var mongoose = require('mongoose');

var individualSchema = new mongoose.Schema(
    {
        user:String,
        title:String,
        timestamp:String
    }
);


module.exports.TotalRevisionNum = function (title, res) {
    individualSchema.find({'title': title}).count().exec(function(err, results){
        if (err){
            console.log("Error when counting total revision number")
        }
        else{
            res(results);
        }
    })
};
