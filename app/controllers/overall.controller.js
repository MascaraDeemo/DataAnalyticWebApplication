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

module.exports

