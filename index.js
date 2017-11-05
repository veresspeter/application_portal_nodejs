var express = require('express');
var app = express();

//app.use(express.static('static'));

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/**
 * Access to the static pages
 */
app.use('/static', express.static('static'));

/**
 * Session
 */
/*
app.use(session({
    secret: '',
    cookie: {
        maxage: 60000
    },
    resave: true,
    saveUninitialized: false
}));
*/

/**
 * Create .error and .tpl on res
 */
app.use(function (req, res, next) {
    res.error = [];
    res.tpl = {};
    return next();
});

/**
 * Include all route
 */
require('./routes/apps')(app);
require('./routes/judges')(app);
require('./routes/news')(app);
require('./routes/user')(app);

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send("Error");                      // sends a http err msg
    console.error(err.stack);                           // write the err to std:err
});

var server = app.listen(3000, function () {
    console.log("On :3000")
});