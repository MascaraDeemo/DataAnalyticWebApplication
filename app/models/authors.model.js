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
        {'$group':{_id:{user:'$user',title:'$title',timestamp:'$timestamp'}}},
        {'$sort':{_id:1}}
    ]
    authorModel.aggregate(query, function (err, result) {
        if (err){
            res.render('author',{ authorReview: "error when searching author"});
        }
        if (result == "") {
            res("No author found");
        } else {
            res(result);
        }
    })
};







