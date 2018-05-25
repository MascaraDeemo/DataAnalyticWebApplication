var express  = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();

// mongodb connection
mongoose.connect("mongodb:localhost:27017/WikiLatic");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));


//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

//static files from public
app.use(express.static(__dirname + '/public'));

//view engine with pug
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//use routes
var regist = require('./app/routes/registrationPage.routes');
app.use('/', routes);



app.listen(3000, function () {
    console.log("application running on Port 3000");
})