var individual = require('../models/individual.model');

module.exports.TotalRevisionNum = function (req, res) {
    var title = req.query.ArticleTitle;
    individual.TotalRevisionNum(title, function (result) {
        if (result == "nothing") {
            res.render('individual', {titleofArticle : "No article found"});
        } else {
            res.render('individual', {titleofArticle: title, totalREvisions: JSON.stringify(result)});
        }
    })
};

module.exports.TopFiveUser = function (req, res) {
        var title = req.query.ArticleTitle;
        individual.topFiveUser(title, function(result){
            if(result){
                res.render('individual', {top5user: JSON.stringify(result)});
            }
        })
};
