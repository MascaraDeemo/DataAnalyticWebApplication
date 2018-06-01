var authors = require("../models/authors.model");

module.exports.searchByAuthor = function (req, res){
    var author = req.query.authorName;
    authors.searchByAuthor(author, function(result){
        if(result){
            console.log("result passed to controller is " + result);
            if (result == "No author found") {
                res.render('author', { authorReview: "No author found"});
            } else {
                res.render('author', { authorReview: result});
            }
        }
        else{
            console.log("controller err");
        }
    })
};



