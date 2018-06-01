var overall = require("../models/overall.model");


module.exports.MostEdit = function (req, res){
    var mostEdit = new Array();
    var numOfresult = req.query.numOfRevision;
    overall.MostEdit(function(err, result){
        if(err){
            res.append('overallRevisionsMost', "Error when found most edited");
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
            res.append('overallRevisionsMin', "Error when found least edited");
        }
        else{
            for(i=0;i<numOfresult;i++){
                minEdit.push(result[i]);
            }
            res.append('overallRevisionsMost', minEdit);
        }
    })
};

