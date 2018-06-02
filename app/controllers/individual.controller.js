var individual = require('../models/individual.model');

module.exports.TotalRevisionNum = function (req, res, next) {
        title = req.query.ArticleTitle;
    individual.TotalRevisionNum(function (result, err) {
        if(err){
            res.append('totalRevisions',"error counting revision number")
        }
        else{
            res.append('titleofArticle', title);
            res.append('totalRevisions', result);
            next()
        }
    })
};

module.exports.TopFiveUser = function (req, res, next) {
        title = req.query.ArticleTitle;
        individual.topFiveUser(function(result, err){
            if(err){
                res.append('top5user', "error when find top five user")
            }
            else{
                res.append('top5user', result);
            }
        })
};
