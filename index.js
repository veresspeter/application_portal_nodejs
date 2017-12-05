var express = require('express');
var app = express();

const fileUpload = require('express-fileupload');
var session = require('express-session');
var bodyParser = require('body-parser');
var moment = require('moment');

/**
 * Access to the static pages and public files
 */
app.use('/static', express.static('static'));
app.use(express.static('public'));

app.use(fileUpload());
app.set('view engine', 'ejs');

/**
 * Session
 */
app.use(session({
    secret: 'random titok',
    cookie: {
        maxage: 60000
    },
    resave: true,
    saveUninitialized: false
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/**
 * Create .error and .tpl on res
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];
    res.tpl.func= {
        moment: moment
    };
    res.tpl.user= {
        isadmin: false
    };
    return next();
});

/**
 * Include all route
 */
require('./routes/app')(app);
require('./routes/judge')(app);
require('./routes/news')(app);
require('./routes/tender')(app);
require('./routes/user')(app);
require('./routes/general')(app);

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