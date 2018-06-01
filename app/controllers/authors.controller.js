var authors = require("../models/authors.model");

module.exports.searchByAuthor = function (req, res){
    var author = req.query.authorName;
    authors.searchByAuthor(author, function(result){
        if(result){
            if (result == "No author found") {
                res.append('authorRevisions', "No author found");
            }
            res.append('authorRevisions', result);
        }
        else{
            console.log("controller err");
        }
    })
};



