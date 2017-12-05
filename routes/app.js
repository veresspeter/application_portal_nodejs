
var authMW = require('../middlewares/general/auth');
var requirePermissionMW = require('../middlewares/general/requirePermission');

var getAppMW = require('../middlewares/apps/general/getapp');
var updateAppMW = require('../middlewares/apps/general/updateapp');
var deleteAppMW = require('../middlewares/apps/general/deleteapp');

var updateScoreMW = require('../middlewares/apps/scores/updatescore');
var deleteScoreMW = require('../middlewares/apps/scores/deletescore');

var AppModel = require('../models/app');
var UserModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        appModel: AppModel,
        userModel: UserModel
    };

    /**
     * Uploads / Modifies the application
     *      -> than redirects to the user's app page (usr/:id/app)
     */
    app.use('/app/:id/mod',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'user'),
        updateAppMW(objectRepository)
    );

    /**
     * Deletes the application
     *      -> than redirects to the user's app page (/app/user/:id)
     */
    app.use('/app/:id/del',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'user'),
        getAppMW(objectRepository),
        deleteAppMW(objectRepository)
    );

    /**
     * Deletes the score for app with id ':id'
     *          ->redirects to the apps admin page (/apps/all)
     */
    app.use('/app/:id/score/del/',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getAppMW(objectRepository),
        deleteScoreMW(objectRepository)
    );

    /**
     * Updates the score with ':score' for app with id ':id'
     *          -> redirects to the app page of id ':id'
     *             (/apps/app/:id)
     * 
     */
    app.use('/app/:id/score/:score',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getAppMW(objectRepository),
        updateScoreMW(objectRepository)
    );
}