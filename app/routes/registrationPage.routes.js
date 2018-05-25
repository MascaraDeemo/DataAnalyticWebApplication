var express = require('express');
var router = express.Router();



router.post('/register', function(req, res, next){
    return res.render('registrationPage', {title: 'Sign Up'});
});

router.get('/signin', function (req, res, next) {
    return res.render('signin', {title: 'Sign in'})
});





module.exports = router;
