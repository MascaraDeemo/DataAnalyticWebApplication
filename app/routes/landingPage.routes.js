var express = require('express');
var router = express.Router();
var User  = require('../models/user');
var loginlogout = require('../controllers/loginlogout');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/WikiLatic";
var Authors = require('../controllers/authors.controller');
var Overall = require('../controllers/overall.controller');
import {GoogleCharts} from 'google-charts';




router.get('/main', loginlogout.requireLogin, function (req,res, next) {
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

router.get('/login', loginlogout.loggedOut, function (req, res, next) {
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
                req.session.userId = user._id;
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


// use register user form
router.post('/register', function(req, res, next){
    if (req.body.email && req.body.name && req.body.password && req.body.rePassword && req.body.username){
        if(req.body.password !== req.body.rePassword){
            var err = new Error('Password need to be match.')
            err.status = 400;
            return next(err);
        }
        var userData ={
            email: req.body.email,
            username: req.body.username,
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

router.get('/searchByAuthor', Authors.searchByAuthor);

router.get('/', function (req, res, next) {
    return res.render('home', {title: 'Home'});
});

router.get('/author', function (req, res, next) {
    return res.render('author', {title: 'Author Analytics'});
});

router.get('/overall', function (req, res, next) {
    return res.render('overall', {title: 'Overall Analytics'});
});

router.get('/overallRevisionsMost', Overall.MostEdit);
router.get('/overallRevisionsMin', Overall.MinEdit);
router.get('/mostDistinct', Overall.MostDistinct);
router.get('/leastDistinct', Overall.leastDistinct);
router.get('/longestArticle', Overall.longestArticle);
router.get('/shortestArticle', Overall.shortestArticle);
GoogleCharts.load(drawChart);

router.get('/', Overall.setBotFlied);
router.get('/', Overall.setAdminFlied);



module.exports = router;
