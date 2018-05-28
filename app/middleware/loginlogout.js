function loggedOut(req,res, next) {
    if (req.session && req.session.userId){
        return res.redirect('/');
    }
    return next();
}
function requireLogin(req, res, next) {
    if(req.session && req.session.userId){
        return next();
    }else {
        var err = new Error('You must log in to view the page');
        err.status = 401;
        return next(err);
    }

}
module.exports.loggedOut= loggedOut;
module.exports.requireLogin = requireLogin;