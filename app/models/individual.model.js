var express = require('express');
var mongoose = require('mongoose');

var individualSchema = new mongoose.Schema(
    {
        user:String,
        title:String,
        timestamp:String
    }
);

var individualModel = mongoose.model('individualModel',individualSchema, 'revisions');


module.exports.TotalRevisionNum = function (title, res) {
    individualModel.find({'title': title}).count().exec(function(err, results){
        if (err){
            console.log("Error when counting total revision number")
        }
        else{
            res(results);
        }
    })
};

module.exports.topFiveUser = function (title, res) {
    var topFive = [
        {'$match':{$and:[{title:title},{'usertype':{$exists:false}}]}},
        {$group:{_id:"$user",numOfEdits:{$sum:1}}},
        {$sort:{numOfEdits:-1}},
        {$limit:5}]
    individualModel.aggregate(topFive, function (err, result) {
        if(err){
            console.log("error aggregate top 5 users")
        }
        else{
            res(result);
        }
    })
};


