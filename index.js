var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

/**
 * Access to the static pages and public files
 */
app.use('/static', express.static('static'));
app.use(express.static('public'));

app.set('view engine', 'ejs');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/**
 * Create .error and .tpl on res
 */
app.use(function (req, res, next) {
    res.tpl = [];
    res.tpl.error = {};
    return next();
});

/**
 * Include all route
 */
require('./routes/apps')(app);
require('./routes/judges')(app);
require('./routes/user')(app);
require('./routes/news')(app);

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