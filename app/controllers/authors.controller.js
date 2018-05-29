var authors = required("../models/authors.model");

module.exports.searchByAuthor = function (req, res) {
    var author = req.body.authorName;
    authors.searchByAuthor(author, function(err, result){
        if(err){
            console.log("Author not found");
        }else {
            res.json(result);
        }
    })
};



