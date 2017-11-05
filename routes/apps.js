/**
 * Require all the middlewares
 */

var authMW = require('../middlewares/general/auth');
var renderMW = require('../middlewares/general/render');

var getAppMW = require('../middlewares/apps/general/getapp');
var getAppListMW = require('../middlewares/apps/general/getapplist');
var getActiveAppListMW = require('../middlewares/apps/general/getactiveapplist');

var updateAppMW = require('../middlewares/apps/general/updateapp');
var deleteAppMW = require('../middlewares/apps/general/deleteapp');

var updateScoreMW = require('../middlewares/apps/scores/updatescore');
var deleteScoreMW = require('../middlewares/apps/scores/deletescore');

module.exports = function (app) {

    var objectRepository = {

    };

    /**
     * The creation of a new application
     *  GET:    the page with the form
     *  POST:   the data of the new application
     *          -> redirects to apps (/apps)
     */
    app.use('/apps/add',
        authMW(objectRepository),
        updateAppMW(objectRepository),
        renderMW(objectRepository, 'addapp')
    );

    /**
     * Deletes the application with id ':id'
     *          -> redirects to apps (/apps)
     */
    app.use('/apps/del/:id',
        authMW(objectRepository),
        deleteAppMW(objectRepository)
    );

    /**
     * The update of an existing application
     *  GET:    the 'add app' page with data
     *  POST:   the data of the application
     *          -> redirects to apps (/apps)
     */
    app.use('/apps/mod/:id',
        authMW(objectRepository),
        updateAppMW(objectRepository),
        renderMW(objectRepository, 'modapp')
    );

    /**
     * The page of all application that existing.
     *      (apps admin page)
     */
    app.use('/apps/all',
        authMW(objectRepository),
        getAppListMW(objectRepository),
        renderMW(objectRepository, 'allapps')
    );

    /**
     * Updates the score with ':score' for app with id ':id'
     *          -> redirects to the app page of id ':id'
     *             (/apps/app/:id)
     */
    app.use('/apps/app/:id/mod/:score',
        authMW(objectRepository),
        updateScoreMW(objectRepository)
    );

    /**
     * Deletes the score for app with id ':id'
     *          ->redirects to the apps admin page (/apps/all)
     */
    app.use('/apps/app/:id/del/',
        authMW(objectRepository),
        deleteScoreMW(objectRepository)
    );
    
    /**
     * The page of app with id ':id' and it's apps received
     */
    app.use('/apps/app/:id',
        authMW(objectRepository),
        getAppMW(objectRepository),
        renderMW(objectRepository, 'app')
    );

    /**
     * The page for applications that are currently active
     */
    app.use('/apps',
        authMW(objectRepository),
        getActiveAppListMW(objectRepository),
        renderMW(objectRepository,'activeapps')
    );

};