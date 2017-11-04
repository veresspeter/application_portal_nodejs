module.exports = function (app) {

    var authMW = require('../middlewares/general/auth');
    var renderMW = require('../middlewares/general/render');

    var getAppMW = require('../middlewares/apps/general/getapp');
    var getAppListMW = require('../middlewares/apps/general/getapplist');
    var getActiveAppListMW = require('../middlewares/apps/general/getactiveapplist');

    var updateAppMW = require('../middlewares/apps/general/updateapp');
    var deleteAppMW = require('../middlewares/apps/general/deleteapp');

    var updateScoreMW = require('../middlewares/apps/scores/updatescore');
    var deleteScoreMW = require('../middlewares/apps/scores/deletescore');

    /**
     * The creation of a new application
     *  GET:    the page with the form
     *  POST:   the data of the new application
     *          -> redirects to apps (/apps)
     */
    app.use('/apps/add',
        authMW(),
        updateAppMW(),
        renderMW()
    );

    /**
     * Deletes the application with id ':id'
     *          -> redirects to apps (/apps)
     */
    app.use('/apps/del/:id',
        authMW(),
        deleteAppMW()
    );

    /**
     * The update of an existing application
     *  GET:    the 'add app' page with data
     *  POST:   the data of the application
     *          -> redirects to apps (/apps)
     */
    app.use('/apps/mod/:id',
        authMW(),
        updateAppMW(),
        renderMW()
    );

    /**
     * The page of all application that existing.
     *      (apps admin page)
     */
    app.use('/apps/all',
        authMW(),
        getAppListMW(),
        renderMW()
    );

    /**
     * Updates the score with ':score' for app with id ':id'
     *          -> redirects to the app page of id ':id'
     *             (/apps/app/:id)
     */
    app.use('/apps/app/:id/mod/:score',
        authMW(),
        updateScoreMW()
    );

    /**
     * Deletes the score for app with id ':id'
     *          ->redirects to the apps admin page (/apps/all)
     */
    app.use('/apps/app/:id/del/',
        authMW(),
        deleteScoreMW()
    );

    /**
     * The page of app with id ':id' and it's apps received
     */
    app.use('/apps/app/:id',
        authMW(),
        getAppMW(),
        renderMW()
    );

    /**
     * The page for applications that are currently active
     */
    app.use('/apps',
        authMW(),
        getActiveAppListMW(),
        renderMW()
    );

};