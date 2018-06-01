var express = require('express');
var mongoose = require('mongoose');


var overallSchema  = new mongoose.Schema(
    {
        user: String,
        title: String
    }
);

module.exports.MostEdit = function (req, res) {
    var mostEdit = [
        {$group:{_id:"$user", numOfEdits:{$sum:1}}},
        {$sort:{numOfEdits:-1}},
    ]
    overallSchema.aggregate(mostEdit, function(err, results){
        if (err){
            res.append('overallRevisionsMost', "error when aggregate most edited revisions");
        }
        else{
            res(results);
        }
    });
};


module.exports.MinEdit = function (req, res){
    var minEdit = [
        {$group:{_id:"$user", numOfEdits:{$sum:1}}},
        {$sort:{numOfEdits:1}},
    ]
    overallSchema.aggregate(minEdit, function(err, results){
        if (err){
            res.append('overallRevisionsMin', "error when aggregate least edited revisions");
        }
        else{
            res(results);
        }
    })
};