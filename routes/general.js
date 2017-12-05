
var authMW = require('../middlewares/general/auth');
var reverseAuthMW = require('../middlewares/general/reverseauth');
var renderMW = require('../middlewares/general/render');

var getUserbyEmailMW = require('../middlewares/users/data/getuserbyemail');
var sendEmailMW = require('../middlewares/users/general/sendemail');
var createPWMW = require('../middlewares/users/data/createpw');
var registerMW = require('../middlewares/general/register');
var loginMW = require('../middlewares/users/general/login');
var logoutMW = require('../middlewares/users/general/logout');
var mainRedirectMW = require('../middlewares/general/mainredirect');

var UserModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: UserModel
    };

    /**
     * The registration page
     *      GET: The registration page
     *      POST: Creates the new user
     *              -> than redirects, to the user's page (/user/:id')
     */
    app.use('/register',
        reverseAuthMW(objectRepository),
        registerMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    /**
     * New password for forgotten password
     *      GET:    The page for password reminder
     *      POST:   Sends the email than refreshes the page
     */
    app.use('/reminder',
        reverseAuthMW(objectRepository),
        getUserbyEmailMW(objectRepository),
        createPWMW(objectRepository),
        registerMW(objectRepository),
        sendEmailMW(objectRepository),
        renderMW(objectRepository, 'reminder')
    );

    /**
     * Logs in the user
     *      -> than redirects to the same page
     */
    app.use('/login',
        reverseAuthMW(objectRepository),
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

    /**
     *
     */
    app.use('/',
        mainRedirectMW(objectRepository)
    );
}