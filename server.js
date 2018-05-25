var express  = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, function () {
    console.log("application running on Port 3000");
})