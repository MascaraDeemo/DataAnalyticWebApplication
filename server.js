var express  = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

// mongodb connection
// connect/create users database
mongoose.connect("mongodb://localhost:27017/WikiLatic");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('connection successful, now go do your stuff');
});

app.use(session({
    secret: 'WikiLatic',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
})

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//static files from public
app.use(express.static(__dirname + '/public'));

//view engine with pug
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//use routes
var landing = require('./app/routes/landingPage.routes');
app.use('/', landing);

app.use(function(req, res, next){
    var err = new Error('File not Found');
    err.status = 404;
    next(err);
});

app.use(function(err,req,res,next){
    res.status(err.status|| 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(3000, function () {
    console.log("application running on Port 3000");
});