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

var overallModel = mongoose.model('overallModel',overallSchema, 'revisions');

module.exports.MostEdit = function (req, res) {
    var mostEdit = [
        {$group:{_id:"$user", numOfEdits:{$sum:1}}},
        {$sort:{numOfEdits:-1}},
    ]
    overallModel.aggregate(mostEdit, function(err, results){
        if (err){
            console.log("Error when getting result");
        } else {
            console.log("result overall in model is " + JSON.stringify(results));
            res(results);
        }
    });
};


module.exports.MinEdit = function (req, res, next){
    var minEdit = [
        {$group:{_id:"$user", numOfEdits:{$sum:1}}},
        {$sort:{numOfEdits:1}},
    ]
    overallModel.aggregate(minEdit, function(err, results){
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
    overallModel.aggregate(mostDistinct, function (err, results) {
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
    overallModel.aggregate(leastDistinct, function (err, results) {
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
    overallModel.aggregate(longestArticle, function(err,results){
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
    overallModel.aggregate(shortestArticle, function(err,results){
        if(err){
            res.append('shortestArticle', "error when aggregate shortest history article")
        }
        else{
            res(results);
        }
    })
};


module.exports.addFlied = function(users, type, next){
    overallModel.update(
        {user:{"$in":[users]}},
        {$set:{"type":type}},
        function (err) {
            if (err) throw console.log('add flied failed');
            next();

})
};


module.exports.countAnonDistribution = function(res){
    var anonNum = [
        {$match:{anon:""}},
        {$group:{'_id':{"$substr":["timestamp", 0.4]},'EditingTime':{sum:1}}},
        {$sort:{_id:1}}
    ]
    overallModel.aggregate(anonNum, function (err, results) {
        if(err){
            res.append('charts', "error when counting anon users")
        }
        else{
            res(results);
        }
    })
};
module.exports.countBotDistribution = function(res){
    var botNum = [
        {$match:{type:'bot'}},
        {$group:{'_id':{"$substr":["timestamp", 0.4]},'EditingTime':{sum:1}}},
        {$sort:{_id:1}}
    ]
    overallModel.aggregate(botNum, function (err, results) {
        if(err){
            res.append('charts', "error when counting bot users")
        }
        else{
            res(results);
        }
    })
};

module.exports.countAdminDistribution = function(res){
    var adminNum = [
        {$match:{type:'admin'}},
        {$group:{'_id':{"$substr":["timestamp", 0.4]},'EditingTime':{sum:1}}},
        {$sort:{_id:1}}
    ]
    overallModel.aggregate(adminNum, function (err, results) {
        if(err){
            res.append('charts', "error when counting admin users")
        }
        else{
            res(results);
        }
    })
};

module.exports.countUserDistribution = function(res){
    var userNum = [
        {'type':{$exists:false}},
        {$group:{'_id':{"$substr":["timestamp", 0.4]},'EditingTime':{sum:1}}},
        {$sort:{_id:1}}
    ]
    overallModel.aggregate(userNum, function (err, results) {
        if(err){
            res.append('charts', "error when counting user users")
        }
        else{
            res(results);
        }
    })
};

