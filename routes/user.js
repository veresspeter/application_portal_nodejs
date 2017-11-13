/**
 * Require all the middlewares
 */
var authMW = require('../middlewares/general/auth');
var renderMW = require('../middlewares/general/render');

var updateAppMW = require('../middlewares/users/apps/updateapp');
var deleteAppMW = require('../middlewares/users/apps/deleteapp');
var getAppListMW = require('../middlewares/users/apps/getapplist');

var updateDataMW = require('../middlewares/users/data/updatedata');

var loginMW = require('../middlewares/users/general/login');
var logoutMW = require('../middlewares/users/general/logout');
var updatePWMW = require('../middlewares/users/data/updatepw');
var mainRedirectMW = require('../middlewares/general/mainredirect');

var getUserbyEmailMW = require('../middlewares/users/data/getuserbyemail');
var sendEmailMW = require('../middlewares/users/general/sendemail');
var createPWMW = require('../middlewares/users/data/createpw');

var loadAppMW = require('../middlewares/apps/general/loadapp');

module.exports = function (app) {

    var objectRepository = {

    };

    /**
     * The registration page
     *      GET: The registration page
     *      POST: Creates the new user
     *              -> than redirects, to the user's page (/user/:id')
     */
    app.use('/user/reg',
        authMW(objectRepository),
        updateDataMW(objectRepository),
        renderMW(objectRepository,'reg')
    );

    /**
     * New password for forgotten password
     *      GET:    The page for password reminder
     *      POST:   Sends the email than refreshes the page
     */
    app.use('/user/forg',
        authMW(objectRepository),
        getUserbyEmailMW(objectRepository),
        createPWMW(objectRepository),
        updateDataMW(objectRepository),
        sendEmailMW(objectRepository),
        renderMW(objectRepository,'fpsw')
    );

    /**
     * Uploads / Modifies the application
     *      -> than redirects to the user's app page (/user/:id/apps)
     */
    app.use('/user/:id/apps/mod/:id',
        authMW(objectRepository),
        updateAppMW(objectRepository)
    );

    /**
     * Deletes the application
     *      -> than redirects to the user's app page (/user/:id/apps)
     */
    app.use('/user/:id/apps/del/:id',
        authMW(objectRepository),
        loadAppMW(objectRepository),
        deleteAppMW(objectRepository)
    );

    /**
     * The page of the applications that the user uploaded
     */
    app.use('/user/:id/apps',
        function(req,res,next){
            var apps=[{
                id: 1,
                title: '1 - Példapáláyzat',
                filename: 'app1.pdf',
                duedate: '2016-06-29',
                score: '20'
            },{
                id: 2,
                title: '2 - Példapáláyzat',
                filename: 'app2.pdf',
                duedate: '2016-06-29',
                score: ''
            },{
                id: 3,
                title: '3 - Példapáláyzat',
                filename: 'app3.pdf',
                duedate: '2016-06-29',
                score: '20'
            }
            ];
            res.tpl.apps = apps;
            next()
        },
        authMW(objectRepository),
        getAppListMW(objectRepository),
        renderMW(objectRepository,'myapps')
    );

    /**
     * The password update page of the user
     *      GET:    The page for new password
     *      POST:   Updates the users's password
     *                  ->than redirects to the same page (/user/:id)
     */
    app.use('/user/:id/mod/psw',
        authMW(objectRepository),
        loginMW(objectRepository),
        updatePWMW(objectRepository),
        renderMW(objectRepository,'cpwd')
    );

    /**
     * The data update page of the user
     *      GET:    The page of the user's data, editing is enabled
     *      POST:   Updates the users's datas
     *                  ->than redirects to the same page (/user/:id)
     */
    app.use('/user/:id/mod',
        authMW(objectRepository),
        updateDataMW(objectRepository)
    );

    /**
     * The data page of the user
     */
    app.use('/user/:id',
        function(req,res,next){
            var user = {
                id: 1,
                username: 'kissbela',
                name: "Kiss Béla",
                birthdate: '1996-01-04',
                birthplace: 'Makó',
                mothername: 'Szép Irma',
                address: '1117 Budapest, Irinyi J. utca',
                email: 'bela@sch.bme.hu',
                phone: '+36301234567'
            };
            res.tpl.user =user;
            next()
        },
        authMW(objectRepository),
        renderMW(objectRepository,'prof')
    );

    /**
     * Logs in the user
     *      -> than redirects to the same page
     */
    app.use('/login',
        authMW(objectRepository),
        loginMW(objectRepository),
        mainRedirectMW(objectRepository)
    );

    /**
     * Logs out the user
     *      -> than redirects to the root page (/)s
     */
    app.use('/logout',
        authMW(objectRepository),
        logoutMW(objectRepository),
        mainRedirectMW(objectRepository)
    );

};