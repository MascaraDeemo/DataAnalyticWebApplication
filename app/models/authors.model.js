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
    var result = [
        {'$match':{user:req}},
        {'$sort':{_id:1}}
    ]
    revision.aggregate(result, function (err, result) {
        if (err){
            res.append('authorRivisions', "error when searching author");
        }
        res.append('authorRevisions',result);
    })
};







