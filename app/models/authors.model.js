var express = require('express');
var mongoose = require('mongoose');




var authorSchema = new mongoose.Schema(
    {
        user:String,
        title:String,
        timestamp:String
    }
);

var authorModel = mongoose.model('authorModel',authorSchema, 'revisions');


module.exports.searchByAuthor = function(req, res){
    var query = [
        {'$match':{user:req}},
        {'$sort':{_id:1}}
    ]
    authorModel.aggregate(query, function (err, result) {
        if (err){
            res('authorRevisions', "error when searching author");
        }
        console.log("resultsssss is ");
        console.log(result);
        res('authorRevisions',result);
    })
};







