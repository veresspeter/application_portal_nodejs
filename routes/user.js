module.exports = function (app) {

    var authMW = require('../middlewares/general/auth');
    var renderMW = require('../middlewares/general/render');

    var updateAppMW = require('../middlewares/users/apps/updateapp');
    var deleteAppMW = require('../middlewares/users/apps/deleteapp');
    var getAppListMW = require('../middlewares/users/apps/getapplist');

    var updateDataMW = require('../middlewares/users/data/updatedata');

    var loginMW = require('../middlewares/users/general/login');
    var logoutMW = require('../middlewares/users/general/logout');
    var updatePWMW = require('../middlewares/users/data/updatepw');

    var getUserbyEmailMW = require('../middlewares/users/data/getuserbyemail');
    var sendEmailMW = require('../middlewares/users/general/sendemail');
    var createPWMW = require('../middlewares/users/data/createpw');

    /**
     * The registration page
     *      GET: The registration page
     *      POST: Creates the new user
     *              -> than redirects, to the user's page (/user/:id')
     */
    app.use('/user/reg',
        authMW(),
        updateDataMW(),
        renderMW()
    );

    /**
     * New password for forgotten password
     *      GET:    The page for password reminder
     *      POST:   Sends the email than refreshes the page
     */
    app.use('/user/forg',
        authMW(),
        getUserbyEmailMW(),
        createPWMW(),
        updateDataMW()
        sendEmailMW(),
        renderMW()
    );

    /**
     * Uploads / Modifies the application
     *      -> than redirects to the user's app page (/user/:id/apps)
     */
    app.use('/user/:id/apps/mod/:id',
        authMW(),
        updateAppMW()
    );

    /**
     * Deletes the application
     *      -> than redirects to the user's app page (/user/:id/apps)
     */
    app.use('/user/:id/apps/del/:id',
        authMW(),
        deleteAppMW()
    );

    /**
     * The page of the applications that the user uploaded
     */
    app.use('/user/:id/apps',
        authMW(),
        getAppListMW(),
        renderMW()
    );

    /**
     * The password update page of the user
     *      GET:    The page for new password
     *      POST:   Updates the users's password
     *                  ->than redirects to the same page (/user/:id)
     */
    app.use('/user/:id/mod/psw',
        authMW(),
        loginMW(),
        updatePWMW(),
        renderMW()
    );

    /**
     * The data update page of the user
     *      GET:    The page of the user's data, editing is enabled
     *      POST:   Updates the users's datas
     *                  ->than redirects to the same page (/user/:id)
     */
    app.use('/user/:id/mod',
        authMW(),
        updateDataMW(),
        renderMW()
    );

    /**
     * The data page of the user
     */
    app.use('/user/:id',
        authMW(),
        renderMW()
    );

    /**
     * Logs in the user
     *      -> than redirects to the same page
     */
    app.use('/login',
        authMW(),
        loginMW()
    );

    /**
     * Logs out the user
     *      -> than redirects to the root page (/)s
     */
    app.use('/logout',
        authMW(),
        logoutMW()
    );

};