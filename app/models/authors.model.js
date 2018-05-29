var express = require('express');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/WikiLatic";

module.exports.searchByAuthor = function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WikiLatic");
        var query = { username: req.body.authorName};
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err){
             console.log("Search by Author Error")
            }
            else{
                res(result)
            }
        });
    });
    };









