var express = require('express');
var router = express.Router();
var User  = require('../models/user');
var mid = require('../middleware/loginlogout');




router.get('/main', mid.requireLogin, function (req,res, next) {
    User.findByid(req.session.userId)
        .exec(function (error, user) {
            if(error){
                return next(error);
            }else{
                return res.render('main');
            }
        });
});


router.get('/logout', function(req, res, next){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }else{
                return res.redirect('/');
            }
        });
    }
});

router.get('/login', mid.loggedOut, function (req, res, next) {
    return res.render('login', {title: 'Log In'})
});

router.post('/login', function (req, res, next) {
    if(req.body.email && req.body.password){
        User.authenticate(req.body.email, req.body.password, function (error, user){
            if (error || !user){
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = uesr._id;
                return res.redirect('/');
            }
        });
    }else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
});

// get register
router.get('/register', function(req,res, next){
    return res.render('registrationPage', {title: 'Sign up'})
});

router.post('/register', function(req, res, next){
    if (req.body.email && req.body.name && req.body.password && req.body.rePassword){
        if(req.body.password !== req.body.rePassword){
            var err = new Error('Password need to be match.')
            err.status = 400;
            return next(err);
        }
        var userData ={
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        };
        // create schema
        User.create(userData, function(error, user){
            if(error){
                return next(error);
            }else{
                return res.redirect('/')
            }
        })

    }
    else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

router.get('/', function (req, res, next) {
    return res.render('home', {title: 'Home'});
});

module.exports = router;
