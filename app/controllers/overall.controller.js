var overall = require("../models/overall.model");


module.exports.MostEdit = function (req, res){
    overall.MostEdit(function(err, result){
        if(err){
            res.append('overallRevisionsMost', "Error when found most edited");
        }
        else{
            res.append('overallRevisionsMost', result);
        }
    })
};


module.exports.MinEdit = function (req, res){
    overall.MinEdit(function (err, result) {
        if(err){
            res.append('overallRevisionsMin', "Error when found least edited");
        }
        else{
            res.append('overallRevisionsMin', result);
        }
    })
};

