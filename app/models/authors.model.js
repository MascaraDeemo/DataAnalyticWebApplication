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
            res.render('author',{ authorReview: "error when searching author"});
        }
        if (result == "") {
            res("No author found");
        } else {
            console.log("result in model is " + result);
            res(result);
        }

    })
};







