var authors = require("../models/authors.model");

module.exports.searchByAuthor = function (req, res){
    var author = req.query.authorName;
    authors.searchByAuthor(author, function(result){
        if(result){
            if (result == "No author found") {
                res.render('author', { authorReview: "No author found"});
            } else {
                res.render('author', { authorList: JSON.stringify(result)});
            }
        }
        else{
            console.log("controller err");
        }
    })
};



