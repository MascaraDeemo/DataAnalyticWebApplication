var authors = require("../models/authors.model");

module.exports.searchByAuthor = function (req, res){
    var author = req.query.authorName;
    authors.searchByAuthor(author, function(err, result){
        if(err){
            console.log("No Authors found");
            res.error("No author found");
        }
        else{
            res.json(result);
        }
    })
};



