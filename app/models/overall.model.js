var express = require('express');
var mongoose = require('mongoose');


var overallSchema  = new mongoose.Schema(
    {
        user: String,
        title: String,
        timestamp: String,
        anon:String,
        type:String
    }
);

module.exports.MostEdit = function (req, res, next) {
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
            next();
        }
    });
};


module.exports.MinEdit = function (req, res, next){
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
            next();
        }
    })
};


module.exports.mostDistinct = function(req, res){
    var mostDistinct = [
        {$group:{_id:{"TITLE":'$title'}, uniqueUsers:{$addToSet:"$user"}}},
        {$project:{"TITLE":1,uniqueUsersCount:{$size:"$uniqueUsers"}}},
        {$sort:{uniqueUsersCount:-1}},
        {$limit:1}
    ]
    overallSchema.aggregate(mostDistinct, function (err, results) {
        if(err){
            res.append('mostDistinct', "error when aggregate most distinct article")
        }
        else {
            res(results);
        }
    })
};


module.exports.leastDistinct = function(req, res){
    var leastDistinct = [
        {$group:{_id:{"TITLE":'$title'}, uniqueUsers:{$addToSet:"$user"}}},
        {$project:{"TITLE":1,uniqueUsersCount:{$size:"$uniqueUsers"}}},
        {$sort:{uniqueUsersCount:1}},
        {$limit:1}
    ]
    overallSchema.aggregate(leastDistinct, function (err, results) {
        if(err){
            res.append('leastDistinct', "error when aggregate least distinct article")
        }
        else {
            res(results);
        }
    })
};

module.exports.longestArticle = function (req, res) {
    var longestArticle = [
        {$group:{_id:'$title','timestamp':{$min:'$timestamp'}}},
        {$sort:{timestamp:1}},
        {$limit:3}
    ]
    overallSchema.aggregate(longestArticle, function(err,results){
        if(err){
            res.append('longestArticle', "error when aggregate longest history article")
        }
        else{
            res(results);
        }
    })
};

module.exports.shortestArticle = function (req, res) {
    var shortestArticle = [
        {$group:{_id:'$title','timestamp':{$min:'$timestamp'}}},
        {$sort:{timestamp:1}},
        {$limit:3}
    ]
    overallSchema.aggregate(shortestArticle, function(err,results){
        if(err){
            res.append('shortestArticle', "error when aggregate shortest history article")
        }
        else{
            res(results);
        }
    })
};


module.exports.addFlied = function(users, type, next){
    overallSchema.update(
        {user:{"$in":[users]}},
        {$set:{"type":type}},
        function (err) {
            if (err) throw console.log('add flied failed');
            next();

})
};


module.exports.countAnonDistribution = function(req, res){
    var anonNum = [
        {$match:{anon:""}},
        {$group:{'_id':{"$substr":["timestamp", 0.4]},'EditingTime':{sum:1}}},
        {$sort:{_id:1}}
    ]
    overallSchema.aggregate(anonNum, function (err, results) {
        if(err){
            res.append('charts', "error when counting anon users")
        }
        else{
            res(results);
        }
    })
};
module.exports.countbotDistribution = function(req, res){
    var botNum = [
        {$match:{type:'bot'}},
        {$group:{'_id':{"$substr":["timestamp", 0.4]},'EditingTime':{sum:1}}},
        {$sort:{_id:1}}
    ]
    overallSchema.aggregate(botNum, function (err, results) {
        if(err){
            res.append('charts', "error when counting bot users")
        }
        else{
            res(results);
        }
    })
};

module.exports.countAdminDistribution = function(req, res){
    var adminNum = [
        {$match:{type:'admin'}},
        {$group:{'_id':{"$substr":["timestamp", 0.4]},'EditingTime':{sum:1}}},
        {$sort:{_id:1}}
    ]
    overallSchema.aggregate(adminNum, function (err, results) {
        if(err){
            res.append('charts', "error when counting admin users")
        }
        else{
            res(results);
        }
    })
};

module.exports.countUserDistribution = function(req, res){
    var userNum = [
        {'type':{$exists:false}},
        {$group:{'_id':{"$substr":["timestamp", 0.4]},'EditingTime':{sum:1}}},
        {$sort:{_id:1}}
    ]
    overallSchema.aggregate(userNum, function (err, results) {
        if(err){
            res.append('charts', "error when counting user users")
        }
        else{
            res(results);
        }
    })
};

