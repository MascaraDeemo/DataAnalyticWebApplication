var overall = require("../models/overall.model");
var fs = require('fs');


module.exports.MostEdit = function (req, res){
    var mostEdit = new Array();
    var numOfresult = req.query.numOfRevision;
    overall.MostEdit(function(err, result){
        if(err){
            res.append('overallRevisionsMost', "Error when finding most edited");
        }
        else{
            for(i=0;i<numOfresult;i++){
                mostEdit.push(result[i]);
            }
            res.append('overallRevisionsMost', mostEdit);
        }
    })
};


module.exports.MinEdit = function (req, res){
    var minEdit = new Array();
    var numOfresult = req.query.numOfRevision;
    overall.MinEdit(function (err, result) {
        if(err){
            res.append('overallRevisionsMin', "Error when finding least edited");
        }
        else{
            for(i=0;i<numOfresult;i++){
                minEdit.push(result[i]);
            }
            res.append('overallRevisionsMost', minEdit);
        }
    })
};

module.exports.MostDistinct = function (req, res) {
    overall.mostDistinct(function (err, result) {
        if(err){
            res.append('mostDistinct', "Error when finding title with largest distinct user group");
        }
        else{
            res.append('mostDistinct', result);
        }
    })
};

module.exports.leastDistinct = function (req, res) {
    overall.leastDistinct(function (err, result) {
        if(err){
            res.append('leastDistinct', "Error when finding title with least distinct user group");
        }
        else{
            res.append('leastDistinct', result);
        }
    })
};

module.exports.longestArticle = function (req, res) {
    overall.longestArticle(function (err, result) {
        if(err){
            res.append('longestArticle', "Error when finding longest history article");
        }
        else{
            res.append('longestArticle', result);
        }
    })
};



module.exports.shortestArticle = function (req, res) {
    overall.shortestArticle(function (err, result) {
        if(err){
            res.append('shortestArticle', "Error when finding shortest history article");
        }
        else{
            res.append('shortestArticle', result);
        }
    })
};

fs.readFile('bot.txt', function(err, data) {
    if(err) throw err;
    globals.bot = data.toString().split("\n");
});

module.exports.setBotFlied = function(req, res, next){
    overall.addFlied(bot,'bot',next);
};
fs.readFile('admin.txt', function(err, data) {
    if(err) throw err;
    globals.admin = data.toString().split("\n");
});
module.exports.setAdminFlied = function(req, res, next){
    overall.addFlied(admin,'admin',next);
};
var anonEditByYears = [];
module.exports.countAnon = function(req, res, next){
    overall.countAnonDistribution(function (err, result) {
        if(err){
            res.append('chart',"counting Anon error");
        }
        else{
                for(var i=2001;i<2018;i++){
                    anonEditByYears.push({_id:i.toString(),EditingTime:0})
                }
                next()
        }
    })
};
var botEditByYears = [];
module.exports.countBot = function(req, res, next){
    overall.countBotDistribution(function (err, result) {
        if(err){
            res.append('chart',"counting bot error");
        }
        else{
            var botEditByYears = [];
            for(var i=2001;i<2018;i++){
                botEditByYears.push({_id:i.toString(),EditingTime:0})
            }
            next()
        }
    })
};
var adminEditByYears = [];
module.exports.countAdmin = function(req, res, next){
    overall.countAdminDistribution(function (err, result) {
        if(err){
            res.append('chart',"counting Admin error");
        }
        else{
            var adminEditByYears = [];
            for(var i=2001;i<2018;i++){
                adminEditByYears.push({_id:i.toString(),EditingTime:0})
            }
            next()
        }
    })
};
var userEditByYears = [];
module.exports.countUser = function(req, res, next){
    overall.countUserDistribution(function (err, result) {
        if(err){
            res.append('chart',"counting User error");
        }
        else{
            var userEditByYears = [];
            for(i=2001;i<2018;i++){
                userEditByYears.push({_id:i.toString(),EditingTime:0})
            }
            next()
            var chart = [];
            for(var y = 2001; y<2018;y++){
                chart.push({Year:y.toString(),Anon:anonEditByYears[_id][EditingTime],Bot:botEditByYears[_id][EditingTime],Admin:adminEditByYears[_id][EditingTime],User:userEditByYears[_id][EditingTime]})
            }
            res.json(chart);
        }
    })
};
