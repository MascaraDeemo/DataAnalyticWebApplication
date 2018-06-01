var authors = require("../models/authors.model");

module.exports.searchByAuthor = function (req, res){
    var author = req.query.authorName;
    authors.searchByAuthor(author, function(err, result){
        if(err){
            console.log("No Authors found");
            res.error("No author found");
        }
        else{
            console.log("result is");
            console.log(result);
            res.json(result);
        }
    })
};



