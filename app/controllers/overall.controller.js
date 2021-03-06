var overall = require("../models/overall.model");
var fs = require('fs');


module.exports.MostEdit = function (req, res){
    var mostEdit = new Array();
    var numOfresult = req.query.numOfRevision;
    overall.MostEdit(function(result){
        if (result) {
            console.log("result in controller is " + JSON.stringify(result))
            for(i=0;i<numOfresult;i++){
                mostEdit.push(result[i]);
                console.log("mostEdit is " + mostEdit);
            }
            res.render('overall', {overallRevisionsMost: mostEdit});
        }
    })
};


module.exports.MinEdit = function (req, res){
    var minEdit = new Array();
    var numOfresult = req.query.numOfRevision;
    overall.MinEdit(function (result) {
        if(result){
            for(i=0;i<numOfresult;i++){
                minEdit.push(result[i]);
            }
            res.render('overall', {overallRevisionsMin: minEdit});
        }
    })
};

module.exports.MostDistinct = function (req, res) {
    overall.mostDistinct(function (result) {
        if(result){
            res.render('overall', {mostDistinct: result});
        }
    })
};

module.exports.leastDistinct = function (req, res) {
    overall.leastDistinct(function (result) {
        if(result){
            res.render('overall', {leastDistinct: result});
        }
    })
};

module.exports.longestArticle = function (req, res) {
    overall.longestArticle(function (result, err) {
        if(result){
            res.render('overall', {longestArticle: result});
        }
    })
};



module.exports.shortestArticle = function (req, res) {
    overall.shortestArticle(function (result) {
        if(result){
            res.render('overall', {shortestArticle: result});
        }
    })
};

fs.readFile('./public/Bot.txt', function(err, data) {
    if(err) throw err;
    bot = data.toString().split("\n");
});

module.exports.setBotFlied = function(req, res, next){
    overall.addFlied(bot,'bot',next);
};
fs.readFile('./public/Admin.txt', function(err, data) {
    if(err) throw err;
    admin = data.toString().split("\n");
});
module.exports.setAdminFlied = function(req, res, next){
    overall.addFlied(admin,'admin',next);
};
var anonEditByYears = [];
module.exports.countAnon = function(req, res, next){
    overall.countAnonDistribution(function (result, err) {
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
    overall.countBotDistribution(function (result, err) {
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
    overall.countAdminDistribution(function (result, err) {
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

module.exports.countUser = function(req, res, next){
    overall.countUserDistribution(function (result, err) {
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
